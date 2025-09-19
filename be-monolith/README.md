be monolith

```
monolith/
├── docs/
├── node_modules/
├── scripts/
├── src/
│   ├── app/
│   │   ├── providers/
│   │   │   └── expressApp.ts
│   │   └── config/
│   │       └── index.ts
│   ├── modules/
│   │   ├── entities/
│   │   │   ├── order/
│   │   │   │   ├── order.controller.ts
│   │   │   │   ├── order.model.ts
│   │   │   │   └── order.routes.ts
│   │   │   ├── product/
│   │   │   │   ├── product.controller.ts
│   │   │   │   ├── product.model.ts
│   │   │   │   └── product.routes.ts
│   │   │   └── user/
│   │   │       ├── user.controller.ts
│   │   │       ├── user.model.ts
│   │   │       ├── user.routes.ts
│   │   │       └── user.schema.ts
│   │   ├── features/
│   │      ├── auth/
│   │      │   ├── auth.controller.ts
│   │      │   └── auth.routes.ts
│   │      └── catalog/
│   │          ├── catalog.controller.ts
│   │          └── catalog.routes.ts
│   ├── shared/
│   │   ├── constants/
│   │   ├── errors/
│   │   │   ├── apiErrors/
│   │   │   │   ├── baseError.ts
│   │   │   │   ├── errorMessageBuilder.ts
│   │   │   │   └── error.types.ts
│   │   │   └── libs/
│   │   └── middlewares/
│   │       ├── auth.middleware.ts
│   │       ├── error.middleware.ts
│   │       └── validate.middleware.ts
│   └── index.ts
├── .gitignore
├── docker-compose.yml
├── eslint-config.mjs
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.eslint.json
└── tsconfig.json
```

Architectures:

### Layered architecture

![layered architecture](./docs/monolith_layered.jpg)

### Feature sliced design architecture

![Microservice interactions](./docs/monolit_architecture_FSD.jpg)

### Start a project:

```bash
npm install
docker-compose up -d
npm run seed
npm run dev
```

### db monolith:

- dp: "mongodb://root:example@localhost:27017/shop_monolith?authSource=admin"

### API doc`s. Swagger:

http://localhost:8000/api/v1/swagger/

![API docs](./docs/swagger_doc.png)
