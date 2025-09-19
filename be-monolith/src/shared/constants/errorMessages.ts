export const ERROR_MESSAGES = {
  // Generic errors
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  VALIDATION_FAILED: "Validation failed",
  NOT_FOUND: "Not found",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Access forbidden",
  BAD_REQUEST: "Bad Request",

  // Authentication & Authorization
  INVALID_CREDENTIALS: "Invalid email or password",
  TOKEN_EXPIRED: "Token has expired",
  TOKEN_INVALID: "Invalid token",

  // User related
  USER_NOT_FOUND: "User not found",
  USER_ALREADY_EXISTS: "User with this email already exists",
  USERNAME_ALREADY_EXISTS: "User with this username already exists",
  USER_CREATION_FAILED: "Failed to create user",
  USER_UPDATE_FAILED: "Failed to update user",
  USER_DELETE_FAILED: "Failed to delete user",
  USER_ID_INVALID: "Invalid user ID",

  // Product related
  PRODUCT_NOT_FOUND: "Product not found",
  PRODUCT_ALREADY_EXISTS: "Product already exists",
  PRODUCT_OUT_OF_STOCK: "Product is out of stock",
  INSUFFICIENT_STOCK: "Insufficient stock available",
  PRODUCT_CREATION_FAILED: "Failed to create product",
  PRODUCT_ID_INVALID: "Invalid product ID",
  PRODUCT_REQUIRED: "At least one product is required",

  // Order related
  ORDER_NOT_FOUND: "Order not found",
  ORDER_CREATION_FAILED: "Failed to create order",
  ORDER_ALREADY_CANCELLED: "Order is already cancelled",
  ORDER_ALREADY_COMPLETED: "Order is already completed",
  ORDER_CANNOT_BE_MODIFIED: "Order cannot be modified",
  ORDER_ID_INVALID: "Invalid order ID",

  // Cart related
  CART_EMPTY: "Cart is empty",
  CART_ITEM_NOT_FOUND: "Cart item not found",
  CART_UPDATE_FAILED: "Failed to update cart",

  // Payment related
  PAYMENT_FAILED: "Payment processing failed",
  PAYMENT_ALREADY_PROCESSED: "Payment already processed",
  INVALID_PAYMENT_METHOD: "Invalid payment method",
  INSUFFICIENT_FUNDS: "Insufficient funds",

  // Validation specific
  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Please provide a valid email address",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_TOO_SHORT: "Password must be at least 8 characters long",
  PASSWORD_TOO_LONG: "Password cannot exceed 50 characters",
  PASSWORD_UPPERCASE_REQUIRED:
    "Password must contain at least one uppercase letter",
  PASSWORD_LOWERCASE_REQUIRED:
    "Password must contain at least one lowercase letter",
  PASSWORD_NUMBER_REQUIRED: "Password must contain at least one number",
  PASSWORD_SPECIAL_CHAR_REQUIRED:
    "Password must contain at least one special character",
  PASSWORD_TOO_WEAK:
    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  INVALID_EMAIL_OR_PASSWORD: "Invalid email or password",
  USERNAME_TOO_SHORT: "Username must be at least 3 characters long",
  USERNAME_TOO_LONG: "Username cannot exceed 30 characters",
  FIRST_NAME_REQUIRED: "First name is required",
  FIRST_NAME_TOO_SHORT: "First name must be at least 1 character long",
  FIRST_NAME_TOO_LONG: "First name cannot exceed 50 characters",
  LAST_NAME_REQUIRED: "Last name is required",
  LAST_NAME_TOO_SHORT: "Last name must be at least 3 characters long",
  LAST_NAME_TOO_LONG: "Last name cannot exceed 50 characters",
  PHONE_INVALID: "Please provide a valid phone number",

  // File related
  FILE_TOO_LARGE: "File size is too large",
  FILE_TYPE_NOT_SUPPORTED: "File type is not supported",
  FILE_UPLOAD_FAILED: "File upload failed",

  // Database related
  DATABASE_CONNECTION_FAILED: "Database connection failed",
  DUPLICATE_ENTRY: "This entry already exists",
  FOREIGN_KEY_CONSTRAINT: "Cannot delete resource due to dependencies",

  // Rate limiting
  TOO_MANY_REQUESTS: "Too many requests, please try again later",

  // Route related
  ROUTE_NOT_FOUND: "Route not found",
  METHOD_NOT_ALLOWED: "Method not allowed",
} as const;
