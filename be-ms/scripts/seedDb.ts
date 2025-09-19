import mongoose, { Connection } from "mongoose";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

import { UserAuth } from "../services/auth-service/src/models/auth.model";
import { User, UserRole } from "../services/user-service/src/models/user.model";
import { Product } from "../services/product-service/src/models/product.model";
import { Catalog } from "../services/catalog-service/src/models/catalog.model";
import { Order } from "../services/order-service/src/models/order.model";

const COMMON_PASSWORD = "Qwe!12345";

// Database URIs
const authUri =
  "mongodb://root:example@localhost:27022/auth_db?authSource=admin";
const userUri =
  "mongodb://root:example@localhost:27018/user_db?authSource=admin";
const orderUri =
  "mongodb://root:example@localhost:27019/order_db?authSource=admin";
const catalogUri =
  "mongodb://root:example@localhost:27020/catalog_db?authSource=admin";
const productUri =
  "mongodb://root:example@localhost:27021/product_db?authSource=admin";

// Admins
const admins = [
  {
    username: "admin01",
    firstName: "John",
    lastName: "Admin",
    phone: "+48123456789",
    email: "admin01@test.pl",
    role: UserRole.ADMIN,
  },
  {
    username: "admin02",
    firstName: "Jane",
    lastName: "Admin",
    phone: "+48123456790",
    email: "admin02@test.pl",
    role: UserRole.ADMIN,
  },
  {
    username: "admin03",
    firstName: "Mike",
    lastName: "Admin",
    phone: "+48123456791",
    email: "admin03@test.pl",
    role: UserRole.ADMIN,
  },
];

// Customers
const customers = [
  {
    username: "user01",
    firstName: "Alice",
    lastName: "Johnson",
    phone: "+48123456792",
    email: "user01@test.pl",
    role: UserRole.CUSTOMER,
  },
  {
    username: "user02",
    firstName: "Bob",
    lastName: "Smith",
    phone: "+48123456793",
    email: "user02@test.pl",
    role: UserRole.CUSTOMER,
  },
  {
    username: "user03",
    firstName: "Charlie",
    lastName: "Brown",
    phone: "+48123456794",
    email: "user03@test.pl",
    role: UserRole.CUSTOMER,
  },
  {
    username: "user04",
    firstName: "Diana",
    lastName: "Wilson",
    phone: "+48123456795",
    email: "user04@test.pl",
    role: UserRole.CUSTOMER,
  },
  {
    username: "user05",
    firstName: "Eva",
    lastName: "Davis",
    phone: "+48123456796",
    email: "user05@test.pl",
    role: UserRole.CUSTOMER,
  },
];

// Products (30 items)
const clothingProducts = Array.from({ length: 30 }, (_, i) => ({
  name: `Brand${i + 1} Shirt`,
  description: `High quality shirt from Brand${i + 1}`,
  price: 49.99 + i,
  quantity: 50,
  category: "Clothing",
  imageUrl: `https://example.com/images/brand${i + 1}-shirt.jpg`,
}));

async function seedDatabase() {
  let authConn: Connection | null = null;
  let userConn: Connection | null = null;
  let orderConn: Connection | null = null;
  let catalogConn: Connection | null = null;
  let productConn: Connection | null = null;

  try {
    console.log("Connecting to databases...");

    authConn = await mongoose.createConnection(authUri).asPromise();
    userConn = await mongoose.createConnection(userUri).asPromise();
    orderConn = await mongoose.createConnection(orderUri).asPromise();
    catalogConn = await mongoose.createConnection(catalogUri).asPromise();
    productConn = await mongoose.createConnection(productUri).asPromise();

    const UserAuthModel = authConn.model("UserAuth", UserAuth.schema);
    const UserModel = userConn.model("User", User.schema);
    const OrderModel = orderConn.model("Order", Order.schema);
    const ProductModel = productConn.model("Product", Product.schema);
    const CatalogModel = catalogConn.model("Catalog", Catalog.schema);

    // Clear all collections
    await Promise.all([
      UserAuthModel.deleteMany({}),
      UserModel.deleteMany({}),
      ProductModel.deleteMany({}),
      CatalogModel.deleteMany({}),
      OrderModel.deleteMany({}),
    ]);
    console.log("Cleared existing data");

    // Hash common password
    const hashedPassword = await bcrypt.hash(COMMON_PASSWORD, 10);
    const allUsers = [...admins, ...customers];
    const createdUsers: any[] = [];

    // Create UserAuth + User
    for (const u of allUsers) {
      // Auth without email
      const userAuth = await UserAuthModel.create({
        role: u.role,
        password: hashedPassword,
      });

      // User with email, username, phone etc.
      const user = await UserModel.create({
        userId: userAuth._id.toString(),
        username: u.username,
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        phone: u.phone,
        role: u.role,
      });

      createdUsers.push(user);
    }
    console.log(`Created ${createdUsers.length} users`);

    // Products and Catalog
    const createdProducts: any[] = [];
    for (const p of clothingProducts) {
      const product = await ProductModel.create(p);
      createdProducts.push(product);

      await CatalogModel.create({
        productId: product._id.toString(),
        name: p.name,
        title: `${p.name} - ${p.description.substring(0, 50)}`,
        price: p.price,
        quantity: p.quantity,
        category: p.category,
        imageUrl: p.imageUrl,
      });
    }
    console.log(
      `Created ${createdProducts.length} products and catalog entries`
    );

    // Orders for customers
    const customerUsers = createdUsers.filter(
      (u) => u.role === UserRole.CUSTOMER
    );
    const orderData: any[] = [];

    customerUsers.forEach((user, i) => {
      const productsForOrder = [
        {
          productId: createdProducts[i % createdProducts.length]._id.toString(),
          quantity: 1,
        },
        {
          productId:
            createdProducts[(i + 1) % createdProducts.length]._id.toString(),
          quantity: 2,
        },
      ];

      const totalPrice = productsForOrder.reduce((sum, p) => {
        const prod = createdProducts.find(
          (cp) => cp._id.toString() === p.productId
        )!;
        return sum + prod.price * p.quantity;
      }, 0);

      orderData.push({
        userId: user.userId,
        products: productsForOrder,
        totalPrice,
        delivery: {
          address: `Address for ${user.username}`,
          service: "delivery",
        },
        paymentMethod: i % 2 === 0 ? "card" : "cash",
        status: "processing",
      });
    });

    await OrderModel.insertMany(orderData);
    console.log(`Created ${orderData.length} orders`);

    console.log("✅ Database seeding completed successfully!");
    console.log("\nLogin credentials:");
    console.log(
      "Emails: user01@test.pl ... user05@test.pl, admin01@test.pl ... admin03@test.pl"
    );
    console.log(`Password: ${COMMON_PASSWORD}`);
  } catch (err) {
    console.error("❌ Error seeding:", err);
  } finally {
    await Promise.all([
      authConn?.close(),
      userConn?.close(),
      orderConn?.close(),
      catalogConn?.close(),
      productConn?.close(),
    ]);
    console.log("Disconnected from all databases");
  }
}

seedDatabase();
