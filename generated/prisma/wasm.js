
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  nameRu: 'nameRu',
  nameUz: 'nameUz',
  nameEn: 'nameEn',
  email: 'email',
  password: 'password',
  phone: 'phone',
  image: 'image',
  role: 'role',
  status: 'status',
  regionID: 'regionID',
  location: 'location',
  passportSeries: 'passportSeries',
  inn: 'inn'
};

exports.Prisma.RegionScalarFieldEnum = {
  id: 'id',
  nameRu: 'nameRu',
  nameUz: 'nameUz',
  nameEn: 'nameEn'
};

exports.Prisma.BasketScalarFieldEnum = {
  id: 'id',
  productID: 'productID',
  userID: 'userID',
  quantity: 'quantity'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  nameRu: 'nameRu',
  nameUz: 'nameUz',
  nameEn: 'nameEn',
  image: 'image',
  workingHours: 'workingHours',
  levelID: 'levelID',
  priceHourly: 'priceHourly',
  priceDaily: 'priceDaily',
  tools: 'tools'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  userID: 'userID',
  productID: 'productID',
  toolID: 'toolID',
  levelID: 'levelID',
  quantity: 'quantity',
  toolCount: 'toolCount',
  measure: 'measure',
  totalPrice: 'totalPrice',
  locationLat: 'locationLat',
  locationLong: 'locationLong',
  address: 'address',
  orderDate: 'orderDate',
  deliveryDate: 'deliveryDate',
  paymentType: 'paymentType',
  withDelivery: 'withDelivery',
  status: 'status',
  commentToDelivery: 'commentToDelivery'
};

exports.Prisma.ToolScalarFieldEnum = {
  id: 'id',
  nameRu: 'nameRu',
  nameUz: 'nameUz',
  nameEn: 'nameEn',
  descriptionRu: 'descriptionRu',
  descriptionUz: 'descriptionUz',
  descriptionEn: 'descriptionEn',
  price: 'price',
  quantity: 'quantity',
  code: 'code',
  brandID: 'brandID',
  capacityID: 'capacityID',
  sizeID: 'sizeID',
  image: 'image',
  isActive: 'isActive',
  levelID: 'levelID'
};

exports.Prisma.BrandScalarFieldEnum = {
  id: 'id',
  nameRu: 'nameRu',
  nameUz: 'nameUz',
  nameEn: 'nameEn'
};

exports.Prisma.CapacityScalarFieldEnum = {
  id: 'id',
  nameRu: 'nameRu',
  nameUz: 'nameUz',
  nameEn: 'nameEn'
};

exports.Prisma.SizeScalarFieldEnum = {
  id: 'id',
  nameRu: 'nameRu',
  nameUz: 'nameUz',
  nameEn: 'nameEn'
};

exports.Prisma.LevelScalarFieldEnum = {
  id: 'id',
  nameRu: 'nameRu',
  nameUz: 'nameUz',
  nameEn: 'nameEn'
};

exports.Prisma.CommentScalarFieldEnum = {
  id: 'id',
  message: 'message',
  star: 'star',
  masterID: 'masterID',
  orderID: 'orderID'
};

exports.Prisma.MasterScalarFieldEnum = {
  id: 'id',
  nameRu: 'nameRu',
  nameUz: 'nameUz',
  nameEn: 'nameEn',
  isActive: 'isActive',
  phone: 'phone',
  year: 'year',
  image: 'image',
  passportImage: 'passportImage',
  star: 'star',
  masterJobsID: 'masterJobsID'
};

exports.Prisma.MasterJobsScalarFieldEnum = {
  id: 'id',
  toolID: 'toolID',
  minWorkingHour: 'minWorkingHour',
  levelID: 'levelID',
  priceHourly: 'priceHourly',
  priceDaily: 'priceDaily',
  experience: 'experience'
};

exports.Prisma.GeneralInfoScalarFieldEnum = {
  id: 'id',
  email: 'email',
  link: 'link',
  location: 'location',
  phone: 'phone'
};

exports.Prisma.ShowCaseScalarFieldEnum = {
  id: 'id',
  nameRu: 'nameRu',
  nameUz: 'nameUz',
  nameEn: 'nameEn',
  descriptionRu: 'descriptionRu',
  descriptionUz: 'descriptionUz',
  descriptionEn: 'descriptionEn',
  image: 'image',
  link: 'link'
};

exports.Prisma.FAQScalarFieldEnum = {
  id: 'id',
  question: 'question',
  answer: 'answer'
};

exports.Prisma.ContactScalarFieldEnum = {
  id: 'id',
  nameRu: 'nameRu',
  nameUz: 'nameUz',
  nameEn: 'nameEn',
  phone: 'phone',
  address: 'address',
  message: 'message',
  email: 'email'
};

exports.Prisma.PartnerScalarFieldEnum = {
  id: 'id',
  nameRu: 'nameRu',
  nameUz: 'nameUz',
  nameEn: 'nameEn',
  image: 'image'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.UserRole = exports.$Enums.UserRole = {
  admin: 'admin',
  superadmin: 'superadmin',
  vieweradmin: 'vieweradmin',
  legaluser: 'legaluser',
  individualuser: 'individualuser'
};

exports.UserStatus = exports.$Enums.UserStatus = {
  active: 'active',
  passive: 'passive'
};

exports.PaymentType = exports.$Enums.PaymentType = {
  cash: 'cash',
  card: 'card'
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  pending: 'pending',
  accepted: 'accepted',
  rejected: 'rejected',
  canceled: 'canceled',
  delivered: 'delivered'
};

exports.Prisma.ModelName = {
  User: 'User',
  Region: 'Region',
  Basket: 'Basket',
  Product: 'Product',
  Order: 'Order',
  Tool: 'Tool',
  Brand: 'Brand',
  Capacity: 'Capacity',
  Size: 'Size',
  Level: 'Level',
  Comment: 'Comment',
  Master: 'Master',
  MasterJobs: 'MasterJobs',
  GeneralInfo: 'GeneralInfo',
  ShowCase: 'ShowCase',
  FAQ: 'FAQ',
  Contact: 'Contact',
  Partner: 'Partner'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
