/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Product } from "../src/modules/entities/product/product.model";
import { User } from "../src/modules/entities/user/user.model";
import { Order } from "../src/modules/entities/order/order.model";
import { MONGO_URI } from "../src/config";

async function seed() {
  await mongoose.connect(MONGO_URI);

  // --- 1. Users ---
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("Qwe!12345", 10);

  const usersData = [
    {
      username: "user01",
      email: "user01@example.test",
      password: passwordHash,
      firstName: "John",
      lastName: "Doe",
      phone: "+380500000001",
      role: "customer",
      tokenVersion: "",
    },
    {
      username: "user02",
      email: "user02@example.test",
      password: passwordHash,
      firstName: "Jane",
      lastName: "Smith",
      phone: "+380500000002",
      role: "customer",
      tokenVersion: "",
    },
    {
      username: "user03",
      email: "user03@example.test",
      password: passwordHash,
      firstName: "Mike",
      lastName: "Brown",
      phone: "+380500000003",
      role: "customer",
      tokenVersion: "",
    },
    {
      username: "admin01",
      email: "admin01@example.test",
      password: passwordHash,
      firstName: "Alice",
      lastName: "Boss",
      phone: "+380500000004",
      role: "admin",
      tokenVersion: "",
    },
  ];

  const users = await User.insertMany(usersData);
  console.log("✅ Users created");

  // --- 2. Products ---
  await Product.deleteMany({});
  const products = await Product.insertMany(getProducts());
  console.log("✅ Products created");

  // --- 3. Orders ---
  await Order.deleteMany({});
  const orders: any[] = [];

  for (const user of users.filter((u) => u.role === "customer")) {
    // completed orders
    const completedCount = Math.floor(Math.random() * 3) + 3; // 3–5
    for (let i = 0; i < completedCount; i++) {
      const chosen = getRandomProducts(products);
      const total = getTotalPrice(chosen);

      orders.push({
        user: user._id,
        products: chosen.map((p) => ({
          product: p.product._id,
          quantity: p.quantity,
        })),
        totalPrice: total,
        delivery: {
          address: `Street ${Math.floor(Math.random() * 100)}, Lodz`,
          service: Math.random() > 0.5 ? "delivery" : "self pickup",
        },
        paymentMethod: getRandomPayment(),
        status: "delivered",
      });
    }

    // one pending
    const chosen = getRandomProducts(products);
    const total = getTotalPrice(chosen);
    orders.push({
      user: user._id,
      products: chosen.map((p) => ({
        product: p.product._id,
        quantity: p.quantity,
      })),
      totalPrice: total,
      delivery: {
        address: `Street ${Math.floor(Math.random() * 100)}, Kyiv`,
        service: Math.random() > 0.5 ? "delivery" : "self pickup",
      },
      paymentMethod: getRandomPayment(),
      status: "pending",
    });
  }

  await Order.insertMany(orders);
  console.log("✅ Orders created");

  await mongoose.disconnect();
  console.log("🎉 Seed finished!");
}

// --- Helpers ---

function getRandomProducts(products: any[]) {
  const count = Math.floor(Math.random() * 3) + 1; // 1–3 products
  const chosen: { product: any; quantity: number }[] = [];

  for (let i = 0; i < count; i++) {
    const product = products[Math.floor(Math.random() * products.length)];
    const quantity = Math.floor(Math.random() * 3) + 1;
    chosen.push({ product, quantity });
  }

  return chosen;
}

function getTotalPrice(items: { product: any; quantity: number }[]) {
  return items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
}

function getRandomPayment(): "card" | "cash" | "bank transfer" {
  const options: ("card" | "cash" | "bank transfer")[] = [
    "card",
    "cash",
    "bank transfer",
  ];
  return options[Math.floor(Math.random() * options.length)];
}

function getProducts() {
  return [
    // Women Clothing (10)
    {
      name: "Aurora Summer Dress",
      description: "Light cotton dress",
      price: 59.99,
      quantity: 25,
      category: "Women Clothing",
      imageUrl: "",
    },
    {
      name: "Velora Denim Jacket",
      description: "Stylish denim jacket",
      price: 89.99,
      quantity: 15,
      category: "Women Clothing",
      imageUrl: "",
    },
    {
      name: "Mira Silk Blouse",
      description: "Elegant silk blouse",
      price: 74.99,
      quantity: 20,
      category: "Women Clothing",
      imageUrl: "",
    },
    {
      name: "Serenity Maxi Skirt",
      description: "Flowy maxi skirt",
      price: 49.99,
      quantity: 18,
      category: "Women Clothing",
      imageUrl: "",
    },
    {
      name: "Luna Winter Coat",
      description: "Warm woolen coat",
      price: 129.99,
      quantity: 12,
      category: "Women Clothing",
      imageUrl: "",
    },
    {
      name: "Nira Sports Leggings",
      description: "Flexible leggings",
      price: 39.99,
      quantity: 30,
      category: "Women Clothing",
      imageUrl: "",
    },
    {
      name: "Aria Evening Dress",
      description: "Elegant evening gown",
      price: 149.99,
      quantity: 10,
      category: "Women Clothing",
      imageUrl: "",
    },
    {
      name: "Stella T-Shirt",
      description: "Casual cotton T-shirt",
      price: 24.99,
      quantity: 40,
      category: "Women Clothing",
      imageUrl: "",
    },
    {
      name: "Isla Cardigan",
      description: "Soft knit cardigan",
      price: 54.99,
      quantity: 22,
      category: "Women Clothing",
      imageUrl: "",
    },
    {
      name: "Nova Jeans",
      description: "Classic slim-fit jeans",
      price: 69.99,
      quantity: 28,
      category: "Women Clothing",
      imageUrl: "",
    },

    // Men Clothing (10)
    {
      name: "Orion Leather Jacket",
      description: "Stylish black leather jacket",
      price: 199.99,
      quantity: 8,
      category: "Men Clothing",
      imageUrl: "",
    },
    {
      name: "Evo Polo Shirt",
      description: "Cotton polo shirt",
      price: 39.99,
      quantity: 35,
      category: "Men Clothing",
      imageUrl: "",
    },
    {
      name: "Titan Slim Jeans",
      description: "Dark wash slim-fit jeans",
      price: 69.99,
      quantity: 25,
      category: "Men Clothing",
      imageUrl: "",
    },
    {
      name: "Axel Wool Coat",
      description: "Elegant wool winter coat",
      price: 149.99,
      quantity: 12,
      category: "Men Clothing",
      imageUrl: "",
    },
    {
      name: "Vargo Hoodie",
      description: "Comfortable fleece hoodie",
      price: 49.99,
      quantity: 40,
      category: "Men Clothing",
      imageUrl: "",
    },
    {
      name: "Nexon Sports Shorts",
      description: "Breathable shorts",
      price: 29.99,
      quantity: 32,
      category: "Men Clothing",
      imageUrl: "",
    },
    {
      name: "Zephyr Formal Shirt",
      description: "Slim-fit cotton shirt",
      price: 44.99,
      quantity: 30,
      category: "Men Clothing",
      imageUrl: "",
    },
    {
      name: "Draco Cargo Pants",
      description: "Durable cargo pants",
      price: 59.99,
      quantity: 22,
      category: "Men Clothing",
      imageUrl: "",
    },
    {
      name: "Aero Knit Sweater",
      description: "Warm knit sweater",
      price: 64.99,
      quantity: 18,
      category: "Men Clothing",
      imageUrl: "",
    },
    {
      name: "Ignis Tracksuit",
      description: "Full zip tracksuit",
      price: 89.99,
      quantity: 14,
      category: "Men Clothing",
      imageUrl: "",
    },

    // Travel Bags (10)
    {
      name: "Nomad Carry-On",
      description: "Compact travel suitcase",
      price: 129.99,
      quantity: 20,
      category: "Travel Bags",
      imageUrl: "",
    },
    {
      name: "Voyager Duffel",
      description: "Large duffel bag for trips",
      price: 99.99,
      quantity: 25,
      category: "Travel Bags",
      imageUrl: "",
    },
    {
      name: "Odyssey Backpack",
      description: "Durable backpack with laptop slot",
      price: 89.99,
      quantity: 30,
      category: "Travel Bags",
      imageUrl: "",
    },
    {
      name: "Atlas Rolling Suitcase",
      description: "Wheeled suitcase",
      price: 149.99,
      quantity: 15,
      category: "Travel Bags",
      imageUrl: "",
    },
    {
      name: "Terra Cabin Bag",
      description: "Cabin-approved travel bag",
      price: 79.99,
      quantity: 28,
      category: "Travel Bags",
      imageUrl: "",
    },
    {
      name: "Zenith Weekender",
      description: "Stylish leather weekender bag",
      price: 189.99,
      quantity: 10,
      category: "Travel Bags",
      imageUrl: "",
    },
    {
      name: "Aether Messenger Bag",
      description: "Compact messenger bag",
      price: 59.99,
      quantity: 35,
      category: "Travel Bags",
      imageUrl: "",
    },
    {
      name: "Horizon Trolley",
      description: "Lightweight trolley bag",
      price: 139.99,
      quantity: 18,
      category: "Travel Bags",
      imageUrl: "",
    },
    {
      name: "Nebula Business Bag",
      description: "Professional laptop bag",
      price: 99.99,
      quantity: 20,
      category: "Travel Bags",
      imageUrl: "",
    },
    {
      name: "Stratos Expandable Bag",
      description: "Expandable luggage bag",
      price: 159.99,
      quantity: 12,
      category: "Travel Bags",
      imageUrl: "",
    },

    // Sports Bags (10)
    {
      name: "Pulse Gym Duffel",
      description: "Medium-sized sports duffel",
      price: 49.99,
      quantity: 30,
      category: "Sports Bags",
      imageUrl: "",
    },
    {
      name: "Core Training Backpack",
      description: "Spacious training backpack",
      price: 59.99,
      quantity: 28,
      category: "Sports Bags",
      imageUrl: "",
    },
    {
      name: "Flux Yoga Tote",
      description: "Special yoga tote bag",
      price: 39.99,
      quantity: 25,
      category: "Sports Bags",
      imageUrl: "",
    },
    {
      name: "Vortex Shoe Bag",
      description: "Compact shoe bag",
      price: 29.99,
      quantity: 32,
      category: "Sports Bags",
      imageUrl: "",
    },
    {
      name: "Ignite Sports Sack",
      description: "Lightweight drawstring bag",
      price: 19.99,
      quantity: 40,
      category: "Sports Bags",
      imageUrl: "",
    },
    {
      name: "Blaze Pro Duffel",
      description: "Professional athlete’s duffel",
      price: 79.99,
      quantity: 15,
      category: "Sports Bags",
      imageUrl: "",
    },
    {
      name: "Kinetic Crossbody",
      description: "Compact crossbody for gym",
      price: 34.99,
      quantity: 30,
      category: "Sports Bags",
      imageUrl: "",
    },
    {
      name: "Aero Training Bag",
      description: "Training bag with side pocket",
      price: 44.99,
      quantity: 25,
      category: "Sports Bags",
      imageUrl: "",
    },
    {
      name: "Titan XL Sports Duffel",
      description: "Extra-large duffel bag",
      price: 89.99,
      quantity: 12,
      category: "Sports Bags",
      imageUrl: "",
    },
    {
      name: "Sprint Travel Gym Bag",
      description: "Dual-purpose gym & travel bag",
      price: 69.99,
      quantity: 20,
      category: "Sports Bags",
      imageUrl: "",
    },
  ];
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
