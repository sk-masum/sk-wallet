
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model card
 * 
 */
export type card = $Result.DefaultSelection<Prisma.$cardPayload>
/**
 * Model card_provider
 * 
 */
export type card_provider = $Result.DefaultSelection<Prisma.$card_providerPayload>
/**
 * Model credential_record
 * 
 */
export type credential_record = $Result.DefaultSelection<Prisma.$credential_recordPayload>
/**
 * Model document_access_audit
 * 
 */
export type document_access_audit = $Result.DefaultSelection<Prisma.$document_access_auditPayload>
/**
 * Model document_file
 * 
 */
export type document_file = $Result.DefaultSelection<Prisma.$document_filePayload>
/**
 * Model document_record
 * 
 */
export type document_record = $Result.DefaultSelection<Prisma.$document_recordPayload>
/**
 * Model dashboard_favorite
 * 
 */
export type dashboard_favorite = $Result.DefaultSelection<Prisma.$dashboard_favoritePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Accounts
 * const accounts = await prisma.account.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.card`: Exposes CRUD operations for the **card** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cards
    * const cards = await prisma.card.findMany()
    * ```
    */
  get card(): Prisma.cardDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.card_provider`: Exposes CRUD operations for the **card_provider** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Card_providers
    * const card_providers = await prisma.card_provider.findMany()
    * ```
    */
  get card_provider(): Prisma.card_providerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.credential_record`: Exposes CRUD operations for the **credential_record** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Credential_records
    * const credential_records = await prisma.credential_record.findMany()
    * ```
    */
  get credential_record(): Prisma.credential_recordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document_access_audit`: Exposes CRUD operations for the **document_access_audit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Document_access_audits
    * const document_access_audits = await prisma.document_access_audit.findMany()
    * ```
    */
  get document_access_audit(): Prisma.document_access_auditDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document_file`: Exposes CRUD operations for the **document_file** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Document_files
    * const document_files = await prisma.document_file.findMany()
    * ```
    */
  get document_file(): Prisma.document_fileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document_record`: Exposes CRUD operations for the **document_record** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Document_records
    * const document_records = await prisma.document_record.findMany()
    * ```
    */
  get document_record(): Prisma.document_recordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dashboard_favorite`: Exposes CRUD operations for the **dashboard_favorite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Dashboard_favorites
    * const dashboard_favorites = await prisma.dashboard_favorite.findMany()
    * ```
    */
  get dashboard_favorite(): Prisma.dashboard_favoriteDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.15.0
   * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Account: 'Account',
    Session: 'Session',
    User: 'User',
    VerificationToken: 'VerificationToken',
    card: 'card',
    card_provider: 'card_provider',
    credential_record: 'credential_record',
    document_access_audit: 'document_access_audit',
    document_file: 'document_file',
    document_record: 'document_record',
    dashboard_favorite: 'dashboard_favorite'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "account" | "session" | "user" | "verificationToken" | "card" | "card_provider" | "credential_record" | "document_access_audit" | "document_file" | "document_record" | "dashboard_favorite"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      card: {
        payload: Prisma.$cardPayload<ExtArgs>
        fields: Prisma.cardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.cardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.cardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cardPayload>
          }
          findFirst: {
            args: Prisma.cardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.cardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cardPayload>
          }
          findMany: {
            args: Prisma.cardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cardPayload>[]
          }
          create: {
            args: Prisma.cardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cardPayload>
          }
          createMany: {
            args: Prisma.cardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.cardCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cardPayload>[]
          }
          delete: {
            args: Prisma.cardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cardPayload>
          }
          update: {
            args: Prisma.cardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cardPayload>
          }
          deleteMany: {
            args: Prisma.cardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.cardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.cardUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cardPayload>[]
          }
          upsert: {
            args: Prisma.cardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cardPayload>
          }
          aggregate: {
            args: Prisma.CardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCard>
          }
          groupBy: {
            args: Prisma.cardGroupByArgs<ExtArgs>
            result: $Utils.Optional<CardGroupByOutputType>[]
          }
          count: {
            args: Prisma.cardCountArgs<ExtArgs>
            result: $Utils.Optional<CardCountAggregateOutputType> | number
          }
        }
      }
      card_provider: {
        payload: Prisma.$card_providerPayload<ExtArgs>
        fields: Prisma.card_providerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.card_providerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$card_providerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.card_providerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$card_providerPayload>
          }
          findFirst: {
            args: Prisma.card_providerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$card_providerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.card_providerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$card_providerPayload>
          }
          findMany: {
            args: Prisma.card_providerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$card_providerPayload>[]
          }
          create: {
            args: Prisma.card_providerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$card_providerPayload>
          }
          createMany: {
            args: Prisma.card_providerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.card_providerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$card_providerPayload>[]
          }
          delete: {
            args: Prisma.card_providerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$card_providerPayload>
          }
          update: {
            args: Prisma.card_providerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$card_providerPayload>
          }
          deleteMany: {
            args: Prisma.card_providerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.card_providerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.card_providerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$card_providerPayload>[]
          }
          upsert: {
            args: Prisma.card_providerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$card_providerPayload>
          }
          aggregate: {
            args: Prisma.Card_providerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCard_provider>
          }
          groupBy: {
            args: Prisma.card_providerGroupByArgs<ExtArgs>
            result: $Utils.Optional<Card_providerGroupByOutputType>[]
          }
          count: {
            args: Prisma.card_providerCountArgs<ExtArgs>
            result: $Utils.Optional<Card_providerCountAggregateOutputType> | number
          }
        }
      }
      credential_record: {
        payload: Prisma.$credential_recordPayload<ExtArgs>
        fields: Prisma.credential_recordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.credential_recordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credential_recordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.credential_recordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credential_recordPayload>
          }
          findFirst: {
            args: Prisma.credential_recordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credential_recordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.credential_recordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credential_recordPayload>
          }
          findMany: {
            args: Prisma.credential_recordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credential_recordPayload>[]
          }
          create: {
            args: Prisma.credential_recordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credential_recordPayload>
          }
          createMany: {
            args: Prisma.credential_recordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.credential_recordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credential_recordPayload>[]
          }
          delete: {
            args: Prisma.credential_recordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credential_recordPayload>
          }
          update: {
            args: Prisma.credential_recordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credential_recordPayload>
          }
          deleteMany: {
            args: Prisma.credential_recordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.credential_recordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.credential_recordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credential_recordPayload>[]
          }
          upsert: {
            args: Prisma.credential_recordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credential_recordPayload>
          }
          aggregate: {
            args: Prisma.Credential_recordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCredential_record>
          }
          groupBy: {
            args: Prisma.credential_recordGroupByArgs<ExtArgs>
            result: $Utils.Optional<Credential_recordGroupByOutputType>[]
          }
          count: {
            args: Prisma.credential_recordCountArgs<ExtArgs>
            result: $Utils.Optional<Credential_recordCountAggregateOutputType> | number
          }
        }
      }
      document_access_audit: {
        payload: Prisma.$document_access_auditPayload<ExtArgs>
        fields: Prisma.document_access_auditFieldRefs
        operations: {
          findUnique: {
            args: Prisma.document_access_auditFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_access_auditPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.document_access_auditFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_access_auditPayload>
          }
          findFirst: {
            args: Prisma.document_access_auditFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_access_auditPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.document_access_auditFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_access_auditPayload>
          }
          findMany: {
            args: Prisma.document_access_auditFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_access_auditPayload>[]
          }
          create: {
            args: Prisma.document_access_auditCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_access_auditPayload>
          }
          createMany: {
            args: Prisma.document_access_auditCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.document_access_auditCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_access_auditPayload>[]
          }
          delete: {
            args: Prisma.document_access_auditDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_access_auditPayload>
          }
          update: {
            args: Prisma.document_access_auditUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_access_auditPayload>
          }
          deleteMany: {
            args: Prisma.document_access_auditDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.document_access_auditUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.document_access_auditUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_access_auditPayload>[]
          }
          upsert: {
            args: Prisma.document_access_auditUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_access_auditPayload>
          }
          aggregate: {
            args: Prisma.Document_access_auditAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument_access_audit>
          }
          groupBy: {
            args: Prisma.document_access_auditGroupByArgs<ExtArgs>
            result: $Utils.Optional<Document_access_auditGroupByOutputType>[]
          }
          count: {
            args: Prisma.document_access_auditCountArgs<ExtArgs>
            result: $Utils.Optional<Document_access_auditCountAggregateOutputType> | number
          }
        }
      }
      document_file: {
        payload: Prisma.$document_filePayload<ExtArgs>
        fields: Prisma.document_fileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.document_fileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_filePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.document_fileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_filePayload>
          }
          findFirst: {
            args: Prisma.document_fileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_filePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.document_fileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_filePayload>
          }
          findMany: {
            args: Prisma.document_fileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_filePayload>[]
          }
          create: {
            args: Prisma.document_fileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_filePayload>
          }
          createMany: {
            args: Prisma.document_fileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.document_fileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_filePayload>[]
          }
          delete: {
            args: Prisma.document_fileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_filePayload>
          }
          update: {
            args: Prisma.document_fileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_filePayload>
          }
          deleteMany: {
            args: Prisma.document_fileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.document_fileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.document_fileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_filePayload>[]
          }
          upsert: {
            args: Prisma.document_fileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_filePayload>
          }
          aggregate: {
            args: Prisma.Document_fileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument_file>
          }
          groupBy: {
            args: Prisma.document_fileGroupByArgs<ExtArgs>
            result: $Utils.Optional<Document_fileGroupByOutputType>[]
          }
          count: {
            args: Prisma.document_fileCountArgs<ExtArgs>
            result: $Utils.Optional<Document_fileCountAggregateOutputType> | number
          }
        }
      }
      document_record: {
        payload: Prisma.$document_recordPayload<ExtArgs>
        fields: Prisma.document_recordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.document_recordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_recordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.document_recordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_recordPayload>
          }
          findFirst: {
            args: Prisma.document_recordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_recordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.document_recordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_recordPayload>
          }
          findMany: {
            args: Prisma.document_recordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_recordPayload>[]
          }
          create: {
            args: Prisma.document_recordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_recordPayload>
          }
          createMany: {
            args: Prisma.document_recordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.document_recordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_recordPayload>[]
          }
          delete: {
            args: Prisma.document_recordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_recordPayload>
          }
          update: {
            args: Prisma.document_recordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_recordPayload>
          }
          deleteMany: {
            args: Prisma.document_recordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.document_recordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.document_recordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_recordPayload>[]
          }
          upsert: {
            args: Prisma.document_recordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_recordPayload>
          }
          aggregate: {
            args: Prisma.Document_recordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument_record>
          }
          groupBy: {
            args: Prisma.document_recordGroupByArgs<ExtArgs>
            result: $Utils.Optional<Document_recordGroupByOutputType>[]
          }
          count: {
            args: Prisma.document_recordCountArgs<ExtArgs>
            result: $Utils.Optional<Document_recordCountAggregateOutputType> | number
          }
        }
      }
      dashboard_favorite: {
        payload: Prisma.$dashboard_favoritePayload<ExtArgs>
        fields: Prisma.dashboard_favoriteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.dashboard_favoriteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dashboard_favoritePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.dashboard_favoriteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dashboard_favoritePayload>
          }
          findFirst: {
            args: Prisma.dashboard_favoriteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dashboard_favoritePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.dashboard_favoriteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dashboard_favoritePayload>
          }
          findMany: {
            args: Prisma.dashboard_favoriteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dashboard_favoritePayload>[]
          }
          create: {
            args: Prisma.dashboard_favoriteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dashboard_favoritePayload>
          }
          createMany: {
            args: Prisma.dashboard_favoriteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.dashboard_favoriteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dashboard_favoritePayload>[]
          }
          delete: {
            args: Prisma.dashboard_favoriteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dashboard_favoritePayload>
          }
          update: {
            args: Prisma.dashboard_favoriteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dashboard_favoritePayload>
          }
          deleteMany: {
            args: Prisma.dashboard_favoriteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.dashboard_favoriteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.dashboard_favoriteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dashboard_favoritePayload>[]
          }
          upsert: {
            args: Prisma.dashboard_favoriteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dashboard_favoritePayload>
          }
          aggregate: {
            args: Prisma.Dashboard_favoriteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDashboard_favorite>
          }
          groupBy: {
            args: Prisma.dashboard_favoriteGroupByArgs<ExtArgs>
            result: $Utils.Optional<Dashboard_favoriteGroupByOutputType>[]
          }
          count: {
            args: Prisma.dashboard_favoriteCountArgs<ExtArgs>
            result: $Utils.Optional<Dashboard_favoriteCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    account?: AccountOmit
    session?: SessionOmit
    user?: UserOmit
    verificationToken?: VerificationTokenOmit
    card?: cardOmit
    card_provider?: card_providerOmit
    credential_record?: credential_recordOmit
    document_access_audit?: document_access_auditOmit
    document_file?: document_fileOmit
    document_record?: document_recordOmit
    dashboard_favorite?: dashboard_favoriteOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    sessions: number
    cards: number
    credentials: number
    documents: number
    documentAccessAudits: number
    dashboardFavorites: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    cards?: boolean | UserCountOutputTypeCountCardsArgs
    credentials?: boolean | UserCountOutputTypeCountCredentialsArgs
    documents?: boolean | UserCountOutputTypeCountDocumentsArgs
    documentAccessAudits?: boolean | UserCountOutputTypeCountDocumentAccessAuditsArgs
    dashboardFavorites?: boolean | UserCountOutputTypeCountDashboardFavoritesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cardWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCredentialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: credential_recordWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: document_recordWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDocumentAccessAuditsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: document_access_auditWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDashboardFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: dashboard_favoriteWhereInput
  }


  /**
   * Count Type Card_providerCountOutputType
   */

  export type Card_providerCountOutputType = {
    card: number
  }

  export type Card_providerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    card?: boolean | Card_providerCountOutputTypeCountCardArgs
  }

  // Custom InputTypes
  /**
   * Card_providerCountOutputType without action
   */
  export type Card_providerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card_providerCountOutputType
     */
    select?: Card_providerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Card_providerCountOutputType without action
   */
  export type Card_providerCountOutputTypeCountCardArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cardWhereInput
  }


  /**
   * Count Type Document_recordCountOutputType
   */

  export type Document_recordCountOutputType = {
    document_access_audit: number
    document_file: number
  }

  export type Document_recordCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document_access_audit?: boolean | Document_recordCountOutputTypeCountDocument_access_auditArgs
    document_file?: boolean | Document_recordCountOutputTypeCountDocument_fileArgs
  }

  // Custom InputTypes
  /**
   * Document_recordCountOutputType without action
   */
  export type Document_recordCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document_recordCountOutputType
     */
    select?: Document_recordCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Document_recordCountOutputType without action
   */
  export type Document_recordCountOutputTypeCountDocument_access_auditArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: document_access_auditWhereInput
  }

  /**
   * Document_recordCountOutputType without action
   */
  export type Document_recordCountOutputTypeCountDocument_fileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: document_fileWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    cards?: boolean | User$cardsArgs<ExtArgs>
    credentials?: boolean | User$credentialsArgs<ExtArgs>
    documents?: boolean | User$documentsArgs<ExtArgs>
    documentAccessAudits?: boolean | User$documentAccessAuditsArgs<ExtArgs>
    dashboardFavorites?: boolean | User$dashboardFavoritesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    cards?: boolean | User$cardsArgs<ExtArgs>
    credentials?: boolean | User$credentialsArgs<ExtArgs>
    documents?: boolean | User$documentsArgs<ExtArgs>
    documentAccessAudits?: boolean | User$documentAccessAuditsArgs<ExtArgs>
    dashboardFavorites?: boolean | User$dashboardFavoritesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      cards: Prisma.$cardPayload<ExtArgs>[]
      credentials: Prisma.$credential_recordPayload<ExtArgs>[]
      documents: Prisma.$document_recordPayload<ExtArgs>[]
      documentAccessAudits: Prisma.$document_access_auditPayload<ExtArgs>[]
      dashboardFavorites: Prisma.$dashboard_favoritePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      emailVerified: Date | null
      image: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cards<T extends User$cardsArgs<ExtArgs> = {}>(args?: Subset<T, User$cardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    credentials<T extends User$credentialsArgs<ExtArgs> = {}>(args?: Subset<T, User$credentialsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$credential_recordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents<T extends User$documentsArgs<ExtArgs> = {}>(args?: Subset<T, User$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_recordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documentAccessAudits<T extends User$documentAccessAuditsArgs<ExtArgs> = {}>(args?: Subset<T, User$documentAccessAuditsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_access_auditPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    dashboardFavorites<T extends User$dashboardFavoritesArgs<ExtArgs> = {}>(args?: Subset<T, User$dashboardFavoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dashboard_favoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.cards
   */
  export type User$cardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card
     */
    select?: cardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card
     */
    omit?: cardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cardInclude<ExtArgs> | null
    where?: cardWhereInput
    orderBy?: cardOrderByWithRelationInput | cardOrderByWithRelationInput[]
    cursor?: cardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * User.credentials
   */
  export type User$credentialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credential_record
     */
    select?: credential_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credential_record
     */
    omit?: credential_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credential_recordInclude<ExtArgs> | null
    where?: credential_recordWhereInput
    orderBy?: credential_recordOrderByWithRelationInput | credential_recordOrderByWithRelationInput[]
    cursor?: credential_recordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Credential_recordScalarFieldEnum | Credential_recordScalarFieldEnum[]
  }

  /**
   * User.documents
   */
  export type User$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_record
     */
    select?: document_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_record
     */
    omit?: document_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_recordInclude<ExtArgs> | null
    where?: document_recordWhereInput
    orderBy?: document_recordOrderByWithRelationInput | document_recordOrderByWithRelationInput[]
    cursor?: document_recordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Document_recordScalarFieldEnum | Document_recordScalarFieldEnum[]
  }

  /**
   * User.documentAccessAudits
   */
  export type User$documentAccessAuditsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_access_audit
     */
    select?: document_access_auditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_access_audit
     */
    omit?: document_access_auditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_access_auditInclude<ExtArgs> | null
    where?: document_access_auditWhereInput
    orderBy?: document_access_auditOrderByWithRelationInput | document_access_auditOrderByWithRelationInput[]
    cursor?: document_access_auditWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Document_access_auditScalarFieldEnum | Document_access_auditScalarFieldEnum[]
  }

  /**
   * User.dashboardFavorites
   */
  export type User$dashboardFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboard_favorite
     */
    select?: dashboard_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dashboard_favorite
     */
    omit?: dashboard_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dashboard_favoriteInclude<ExtArgs> | null
    where?: dashboard_favoriteWhereInput
    orderBy?: dashboard_favoriteOrderByWithRelationInput | dashboard_favoriteOrderByWithRelationInput[]
    cursor?: dashboard_favoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Dashboard_favoriteScalarFieldEnum | Dashboard_favoriteScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model card
   */

  export type AggregateCard = {
    _count: CardCountAggregateOutputType | null
    _avg: CardAvgAggregateOutputType | null
    _sum: CardSumAggregateOutputType | null
    _min: CardMinAggregateOutputType | null
    _max: CardMaxAggregateOutputType | null
  }

  export type CardAvgAggregateOutputType = {
    id: number | null
    network: number | null
    expiry_month: number | null
    expiry_year: number | null
    credit_limit: number | null
    provider_id: number | null
    billing_date: number | null
    payment_date: number | null
  }

  export type CardSumAggregateOutputType = {
    id: bigint | null
    network: number | null
    expiry_month: number | null
    expiry_year: number | null
    credit_limit: number | null
    provider_id: bigint | null
    billing_date: number | null
    payment_date: number | null
  }

  export type CardMinAggregateOutputType = {
    id: bigint | null
    created_at: Date | null
    card_name: string | null
    number: string | null
    cvv: string | null
    holder_name: string | null
    network: number | null
    isCredit: boolean | null
    expiry_month: number | null
    expiry_year: number | null
    owner_id: string | null
    color_name: string | null
    tags: string | null
    status: string | null
    credit_limit: number | null
    provider_id: bigint | null
    billing_date: number | null
    payment_date: number | null
  }

  export type CardMaxAggregateOutputType = {
    id: bigint | null
    created_at: Date | null
    card_name: string | null
    number: string | null
    cvv: string | null
    holder_name: string | null
    network: number | null
    isCredit: boolean | null
    expiry_month: number | null
    expiry_year: number | null
    owner_id: string | null
    color_name: string | null
    tags: string | null
    status: string | null
    credit_limit: number | null
    provider_id: bigint | null
    billing_date: number | null
    payment_date: number | null
  }

  export type CardCountAggregateOutputType = {
    id: number
    created_at: number
    card_name: number
    number: number
    cvv: number
    holder_name: number
    network: number
    isCredit: number
    expiry_month: number
    expiry_year: number
    owner_id: number
    color_name: number
    tags: number
    status: number
    credit_limit: number
    provider_id: number
    billing_date: number
    payment_date: number
    _all: number
  }


  export type CardAvgAggregateInputType = {
    id?: true
    network?: true
    expiry_month?: true
    expiry_year?: true
    credit_limit?: true
    provider_id?: true
    billing_date?: true
    payment_date?: true
  }

  export type CardSumAggregateInputType = {
    id?: true
    network?: true
    expiry_month?: true
    expiry_year?: true
    credit_limit?: true
    provider_id?: true
    billing_date?: true
    payment_date?: true
  }

  export type CardMinAggregateInputType = {
    id?: true
    created_at?: true
    card_name?: true
    number?: true
    cvv?: true
    holder_name?: true
    network?: true
    isCredit?: true
    expiry_month?: true
    expiry_year?: true
    owner_id?: true
    color_name?: true
    tags?: true
    status?: true
    credit_limit?: true
    provider_id?: true
    billing_date?: true
    payment_date?: true
  }

  export type CardMaxAggregateInputType = {
    id?: true
    created_at?: true
    card_name?: true
    number?: true
    cvv?: true
    holder_name?: true
    network?: true
    isCredit?: true
    expiry_month?: true
    expiry_year?: true
    owner_id?: true
    color_name?: true
    tags?: true
    status?: true
    credit_limit?: true
    provider_id?: true
    billing_date?: true
    payment_date?: true
  }

  export type CardCountAggregateInputType = {
    id?: true
    created_at?: true
    card_name?: true
    number?: true
    cvv?: true
    holder_name?: true
    network?: true
    isCredit?: true
    expiry_month?: true
    expiry_year?: true
    owner_id?: true
    color_name?: true
    tags?: true
    status?: true
    credit_limit?: true
    provider_id?: true
    billing_date?: true
    payment_date?: true
    _all?: true
  }

  export type CardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which card to aggregate.
     */
    where?: cardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cards to fetch.
     */
    orderBy?: cardOrderByWithRelationInput | cardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: cardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned cards
    **/
    _count?: true | CardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CardAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CardSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CardMaxAggregateInputType
  }

  export type GetCardAggregateType<T extends CardAggregateArgs> = {
        [P in keyof T & keyof AggregateCard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCard[P]>
      : GetScalarType<T[P], AggregateCard[P]>
  }




  export type cardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cardWhereInput
    orderBy?: cardOrderByWithAggregationInput | cardOrderByWithAggregationInput[]
    by: CardScalarFieldEnum[] | CardScalarFieldEnum
    having?: cardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CardCountAggregateInputType | true
    _avg?: CardAvgAggregateInputType
    _sum?: CardSumAggregateInputType
    _min?: CardMinAggregateInputType
    _max?: CardMaxAggregateInputType
  }

  export type CardGroupByOutputType = {
    id: bigint
    created_at: Date
    card_name: string | null
    number: string
    cvv: string
    holder_name: string | null
    network: number
    isCredit: boolean | null
    expiry_month: number
    expiry_year: number
    owner_id: string
    color_name: string | null
    tags: string
    status: string
    credit_limit: number | null
    provider_id: bigint | null
    billing_date: number | null
    payment_date: number | null
    _count: CardCountAggregateOutputType | null
    _avg: CardAvgAggregateOutputType | null
    _sum: CardSumAggregateOutputType | null
    _min: CardMinAggregateOutputType | null
    _max: CardMaxAggregateOutputType | null
  }

  type GetCardGroupByPayload<T extends cardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CardGroupByOutputType[P]>
            : GetScalarType<T[P], CardGroupByOutputType[P]>
        }
      >
    >


  export type cardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    card_name?: boolean
    number?: boolean
    cvv?: boolean
    holder_name?: boolean
    network?: boolean
    isCredit?: boolean
    expiry_month?: boolean
    expiry_year?: boolean
    owner_id?: boolean
    color_name?: boolean
    tags?: boolean
    status?: boolean
    credit_limit?: boolean
    provider_id?: boolean
    billing_date?: boolean
    payment_date?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    card_provider?: boolean | card$card_providerArgs<ExtArgs>
  }, ExtArgs["result"]["card"]>

  export type cardSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    card_name?: boolean
    number?: boolean
    cvv?: boolean
    holder_name?: boolean
    network?: boolean
    isCredit?: boolean
    expiry_month?: boolean
    expiry_year?: boolean
    owner_id?: boolean
    color_name?: boolean
    tags?: boolean
    status?: boolean
    credit_limit?: boolean
    provider_id?: boolean
    billing_date?: boolean
    payment_date?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    card_provider?: boolean | card$card_providerArgs<ExtArgs>
  }, ExtArgs["result"]["card"]>

  export type cardSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    card_name?: boolean
    number?: boolean
    cvv?: boolean
    holder_name?: boolean
    network?: boolean
    isCredit?: boolean
    expiry_month?: boolean
    expiry_year?: boolean
    owner_id?: boolean
    color_name?: boolean
    tags?: boolean
    status?: boolean
    credit_limit?: boolean
    provider_id?: boolean
    billing_date?: boolean
    payment_date?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    card_provider?: boolean | card$card_providerArgs<ExtArgs>
  }, ExtArgs["result"]["card"]>

  export type cardSelectScalar = {
    id?: boolean
    created_at?: boolean
    card_name?: boolean
    number?: boolean
    cvv?: boolean
    holder_name?: boolean
    network?: boolean
    isCredit?: boolean
    expiry_month?: boolean
    expiry_year?: boolean
    owner_id?: boolean
    color_name?: boolean
    tags?: boolean
    status?: boolean
    credit_limit?: boolean
    provider_id?: boolean
    billing_date?: boolean
    payment_date?: boolean
  }

  export type cardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "card_name" | "number" | "cvv" | "holder_name" | "network" | "isCredit" | "expiry_month" | "expiry_year" | "owner_id" | "color_name" | "tags" | "status" | "credit_limit" | "provider_id" | "billing_date" | "payment_date", ExtArgs["result"]["card"]>
  export type cardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    card_provider?: boolean | card$card_providerArgs<ExtArgs>
  }
  export type cardIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    card_provider?: boolean | card$card_providerArgs<ExtArgs>
  }
  export type cardIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    card_provider?: boolean | card$card_providerArgs<ExtArgs>
  }

  export type $cardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "card"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      card_provider: Prisma.$card_providerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      created_at: Date
      card_name: string | null
      number: string
      cvv: string
      holder_name: string | null
      network: number
      isCredit: boolean | null
      expiry_month: number
      expiry_year: number
      owner_id: string
      color_name: string | null
      tags: string
      status: string
      credit_limit: number | null
      provider_id: bigint | null
      billing_date: number | null
      payment_date: number | null
    }, ExtArgs["result"]["card"]>
    composites: {}
  }

  type cardGetPayload<S extends boolean | null | undefined | cardDefaultArgs> = $Result.GetResult<Prisma.$cardPayload, S>

  type cardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<cardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CardCountAggregateInputType | true
    }

  export interface cardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['card'], meta: { name: 'card' } }
    /**
     * Find zero or one Card that matches the filter.
     * @param {cardFindUniqueArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends cardFindUniqueArgs>(args: SelectSubset<T, cardFindUniqueArgs<ExtArgs>>): Prisma__cardClient<$Result.GetResult<Prisma.$cardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Card that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {cardFindUniqueOrThrowArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends cardFindUniqueOrThrowArgs>(args: SelectSubset<T, cardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__cardClient<$Result.GetResult<Prisma.$cardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Card that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cardFindFirstArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends cardFindFirstArgs>(args?: SelectSubset<T, cardFindFirstArgs<ExtArgs>>): Prisma__cardClient<$Result.GetResult<Prisma.$cardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Card that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cardFindFirstOrThrowArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends cardFindFirstOrThrowArgs>(args?: SelectSubset<T, cardFindFirstOrThrowArgs<ExtArgs>>): Prisma__cardClient<$Result.GetResult<Prisma.$cardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cards
     * const cards = await prisma.card.findMany()
     * 
     * // Get first 10 Cards
     * const cards = await prisma.card.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cardWithIdOnly = await prisma.card.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends cardFindManyArgs>(args?: SelectSubset<T, cardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Card.
     * @param {cardCreateArgs} args - Arguments to create a Card.
     * @example
     * // Create one Card
     * const Card = await prisma.card.create({
     *   data: {
     *     // ... data to create a Card
     *   }
     * })
     * 
     */
    create<T extends cardCreateArgs>(args: SelectSubset<T, cardCreateArgs<ExtArgs>>): Prisma__cardClient<$Result.GetResult<Prisma.$cardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cards.
     * @param {cardCreateManyArgs} args - Arguments to create many Cards.
     * @example
     * // Create many Cards
     * const card = await prisma.card.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends cardCreateManyArgs>(args?: SelectSubset<T, cardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cards and returns the data saved in the database.
     * @param {cardCreateManyAndReturnArgs} args - Arguments to create many Cards.
     * @example
     * // Create many Cards
     * const card = await prisma.card.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cards and only return the `id`
     * const cardWithIdOnly = await prisma.card.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends cardCreateManyAndReturnArgs>(args?: SelectSubset<T, cardCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cardPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Card.
     * @param {cardDeleteArgs} args - Arguments to delete one Card.
     * @example
     * // Delete one Card
     * const Card = await prisma.card.delete({
     *   where: {
     *     // ... filter to delete one Card
     *   }
     * })
     * 
     */
    delete<T extends cardDeleteArgs>(args: SelectSubset<T, cardDeleteArgs<ExtArgs>>): Prisma__cardClient<$Result.GetResult<Prisma.$cardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Card.
     * @param {cardUpdateArgs} args - Arguments to update one Card.
     * @example
     * // Update one Card
     * const card = await prisma.card.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends cardUpdateArgs>(args: SelectSubset<T, cardUpdateArgs<ExtArgs>>): Prisma__cardClient<$Result.GetResult<Prisma.$cardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cards.
     * @param {cardDeleteManyArgs} args - Arguments to filter Cards to delete.
     * @example
     * // Delete a few Cards
     * const { count } = await prisma.card.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends cardDeleteManyArgs>(args?: SelectSubset<T, cardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cards
     * const card = await prisma.card.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends cardUpdateManyArgs>(args: SelectSubset<T, cardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cards and returns the data updated in the database.
     * @param {cardUpdateManyAndReturnArgs} args - Arguments to update many Cards.
     * @example
     * // Update many Cards
     * const card = await prisma.card.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cards and only return the `id`
     * const cardWithIdOnly = await prisma.card.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends cardUpdateManyAndReturnArgs>(args: SelectSubset<T, cardUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cardPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Card.
     * @param {cardUpsertArgs} args - Arguments to update or create a Card.
     * @example
     * // Update or create a Card
     * const card = await prisma.card.upsert({
     *   create: {
     *     // ... data to create a Card
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Card we want to update
     *   }
     * })
     */
    upsert<T extends cardUpsertArgs>(args: SelectSubset<T, cardUpsertArgs<ExtArgs>>): Prisma__cardClient<$Result.GetResult<Prisma.$cardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cardCountArgs} args - Arguments to filter Cards to count.
     * @example
     * // Count the number of Cards
     * const count = await prisma.card.count({
     *   where: {
     *     // ... the filter for the Cards we want to count
     *   }
     * })
    **/
    count<T extends cardCountArgs>(
      args?: Subset<T, cardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Card.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CardAggregateArgs>(args: Subset<T, CardAggregateArgs>): Prisma.PrismaPromise<GetCardAggregateType<T>>

    /**
     * Group by Card.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends cardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: cardGroupByArgs['orderBy'] }
        : { orderBy?: cardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, cardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the card model
   */
  readonly fields: cardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for card.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__cardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    card_provider<T extends card$card_providerArgs<ExtArgs> = {}>(args?: Subset<T, card$card_providerArgs<ExtArgs>>): Prisma__card_providerClient<$Result.GetResult<Prisma.$card_providerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the card model
   */
  interface cardFieldRefs {
    readonly id: FieldRef<"card", 'BigInt'>
    readonly created_at: FieldRef<"card", 'DateTime'>
    readonly card_name: FieldRef<"card", 'String'>
    readonly number: FieldRef<"card", 'String'>
    readonly cvv: FieldRef<"card", 'String'>
    readonly holder_name: FieldRef<"card", 'String'>
    readonly network: FieldRef<"card", 'Int'>
    readonly isCredit: FieldRef<"card", 'Boolean'>
    readonly expiry_month: FieldRef<"card", 'Int'>
    readonly expiry_year: FieldRef<"card", 'Int'>
    readonly owner_id: FieldRef<"card", 'String'>
    readonly color_name: FieldRef<"card", 'String'>
    readonly tags: FieldRef<"card", 'String'>
    readonly status: FieldRef<"card", 'String'>
    readonly credit_limit: FieldRef<"card", 'Float'>
    readonly provider_id: FieldRef<"card", 'BigInt'>
    readonly billing_date: FieldRef<"card", 'Int'>
    readonly payment_date: FieldRef<"card", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * card findUnique
   */
  export type cardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card
     */
    select?: cardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card
     */
    omit?: cardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cardInclude<ExtArgs> | null
    /**
     * Filter, which card to fetch.
     */
    where: cardWhereUniqueInput
  }

  /**
   * card findUniqueOrThrow
   */
  export type cardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card
     */
    select?: cardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card
     */
    omit?: cardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cardInclude<ExtArgs> | null
    /**
     * Filter, which card to fetch.
     */
    where: cardWhereUniqueInput
  }

  /**
   * card findFirst
   */
  export type cardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card
     */
    select?: cardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card
     */
    omit?: cardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cardInclude<ExtArgs> | null
    /**
     * Filter, which card to fetch.
     */
    where?: cardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cards to fetch.
     */
    orderBy?: cardOrderByWithRelationInput | cardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cards.
     */
    cursor?: cardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cards.
     */
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * card findFirstOrThrow
   */
  export type cardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card
     */
    select?: cardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card
     */
    omit?: cardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cardInclude<ExtArgs> | null
    /**
     * Filter, which card to fetch.
     */
    where?: cardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cards to fetch.
     */
    orderBy?: cardOrderByWithRelationInput | cardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cards.
     */
    cursor?: cardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cards.
     */
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * card findMany
   */
  export type cardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card
     */
    select?: cardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card
     */
    omit?: cardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cardInclude<ExtArgs> | null
    /**
     * Filter, which cards to fetch.
     */
    where?: cardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cards to fetch.
     */
    orderBy?: cardOrderByWithRelationInput | cardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing cards.
     */
    cursor?: cardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cards.
     */
    skip?: number
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * card create
   */
  export type cardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card
     */
    select?: cardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card
     */
    omit?: cardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cardInclude<ExtArgs> | null
    /**
     * The data needed to create a card.
     */
    data: XOR<cardCreateInput, cardUncheckedCreateInput>
  }

  /**
   * card createMany
   */
  export type cardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many cards.
     */
    data: cardCreateManyInput | cardCreateManyInput[]
  }

  /**
   * card createManyAndReturn
   */
  export type cardCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card
     */
    select?: cardSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the card
     */
    omit?: cardOmit<ExtArgs> | null
    /**
     * The data used to create many cards.
     */
    data: cardCreateManyInput | cardCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cardIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * card update
   */
  export type cardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card
     */
    select?: cardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card
     */
    omit?: cardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cardInclude<ExtArgs> | null
    /**
     * The data needed to update a card.
     */
    data: XOR<cardUpdateInput, cardUncheckedUpdateInput>
    /**
     * Choose, which card to update.
     */
    where: cardWhereUniqueInput
  }

  /**
   * card updateMany
   */
  export type cardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update cards.
     */
    data: XOR<cardUpdateManyMutationInput, cardUncheckedUpdateManyInput>
    /**
     * Filter which cards to update
     */
    where?: cardWhereInput
    /**
     * Limit how many cards to update.
     */
    limit?: number
  }

  /**
   * card updateManyAndReturn
   */
  export type cardUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card
     */
    select?: cardSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the card
     */
    omit?: cardOmit<ExtArgs> | null
    /**
     * The data used to update cards.
     */
    data: XOR<cardUpdateManyMutationInput, cardUncheckedUpdateManyInput>
    /**
     * Filter which cards to update
     */
    where?: cardWhereInput
    /**
     * Limit how many cards to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cardIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * card upsert
   */
  export type cardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card
     */
    select?: cardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card
     */
    omit?: cardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cardInclude<ExtArgs> | null
    /**
     * The filter to search for the card to update in case it exists.
     */
    where: cardWhereUniqueInput
    /**
     * In case the card found by the `where` argument doesn't exist, create a new card with this data.
     */
    create: XOR<cardCreateInput, cardUncheckedCreateInput>
    /**
     * In case the card was found with the provided `where` argument, update it with this data.
     */
    update: XOR<cardUpdateInput, cardUncheckedUpdateInput>
  }

  /**
   * card delete
   */
  export type cardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card
     */
    select?: cardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card
     */
    omit?: cardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cardInclude<ExtArgs> | null
    /**
     * Filter which card to delete.
     */
    where: cardWhereUniqueInput
  }

  /**
   * card deleteMany
   */
  export type cardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cards to delete
     */
    where?: cardWhereInput
    /**
     * Limit how many cards to delete.
     */
    limit?: number
  }

  /**
   * card.card_provider
   */
  export type card$card_providerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card_provider
     */
    select?: card_providerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card_provider
     */
    omit?: card_providerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: card_providerInclude<ExtArgs> | null
    where?: card_providerWhereInput
  }

  /**
   * card without action
   */
  export type cardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card
     */
    select?: cardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card
     */
    omit?: cardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cardInclude<ExtArgs> | null
  }


  /**
   * Model card_provider
   */

  export type AggregateCard_provider = {
    _count: Card_providerCountAggregateOutputType | null
    _avg: Card_providerAvgAggregateOutputType | null
    _sum: Card_providerSumAggregateOutputType | null
    _min: Card_providerMinAggregateOutputType | null
    _max: Card_providerMaxAggregateOutputType | null
  }

  export type Card_providerAvgAggregateOutputType = {
    id: number | null
  }

  export type Card_providerSumAggregateOutputType = {
    id: bigint | null
  }

  export type Card_providerMinAggregateOutputType = {
    id: bigint | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Card_providerMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Card_providerCountAggregateOutputType = {
    id: number
    name: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Card_providerAvgAggregateInputType = {
    id?: true
  }

  export type Card_providerSumAggregateInputType = {
    id?: true
  }

  export type Card_providerMinAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
  }

  export type Card_providerMaxAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
  }

  export type Card_providerCountAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Card_providerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which card_provider to aggregate.
     */
    where?: card_providerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of card_providers to fetch.
     */
    orderBy?: card_providerOrderByWithRelationInput | card_providerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: card_providerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` card_providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` card_providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned card_providers
    **/
    _count?: true | Card_providerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Card_providerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Card_providerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Card_providerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Card_providerMaxAggregateInputType
  }

  export type GetCard_providerAggregateType<T extends Card_providerAggregateArgs> = {
        [P in keyof T & keyof AggregateCard_provider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCard_provider[P]>
      : GetScalarType<T[P], AggregateCard_provider[P]>
  }




  export type card_providerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: card_providerWhereInput
    orderBy?: card_providerOrderByWithAggregationInput | card_providerOrderByWithAggregationInput[]
    by: Card_providerScalarFieldEnum[] | Card_providerScalarFieldEnum
    having?: card_providerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Card_providerCountAggregateInputType | true
    _avg?: Card_providerAvgAggregateInputType
    _sum?: Card_providerSumAggregateInputType
    _min?: Card_providerMinAggregateInputType
    _max?: Card_providerMaxAggregateInputType
  }

  export type Card_providerGroupByOutputType = {
    id: bigint
    name: string
    created_at: Date
    updated_at: Date
    _count: Card_providerCountAggregateOutputType | null
    _avg: Card_providerAvgAggregateOutputType | null
    _sum: Card_providerSumAggregateOutputType | null
    _min: Card_providerMinAggregateOutputType | null
    _max: Card_providerMaxAggregateOutputType | null
  }

  type GetCard_providerGroupByPayload<T extends card_providerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Card_providerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Card_providerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Card_providerGroupByOutputType[P]>
            : GetScalarType<T[P], Card_providerGroupByOutputType[P]>
        }
      >
    >


  export type card_providerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    card?: boolean | card_provider$cardArgs<ExtArgs>
    _count?: boolean | Card_providerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["card_provider"]>

  export type card_providerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["card_provider"]>

  export type card_providerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["card_provider"]>

  export type card_providerSelectScalar = {
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type card_providerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "created_at" | "updated_at", ExtArgs["result"]["card_provider"]>
  export type card_providerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    card?: boolean | card_provider$cardArgs<ExtArgs>
    _count?: boolean | Card_providerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type card_providerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type card_providerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $card_providerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "card_provider"
    objects: {
      card: Prisma.$cardPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["card_provider"]>
    composites: {}
  }

  type card_providerGetPayload<S extends boolean | null | undefined | card_providerDefaultArgs> = $Result.GetResult<Prisma.$card_providerPayload, S>

  type card_providerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<card_providerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Card_providerCountAggregateInputType | true
    }

  export interface card_providerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['card_provider'], meta: { name: 'card_provider' } }
    /**
     * Find zero or one Card_provider that matches the filter.
     * @param {card_providerFindUniqueArgs} args - Arguments to find a Card_provider
     * @example
     * // Get one Card_provider
     * const card_provider = await prisma.card_provider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends card_providerFindUniqueArgs>(args: SelectSubset<T, card_providerFindUniqueArgs<ExtArgs>>): Prisma__card_providerClient<$Result.GetResult<Prisma.$card_providerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Card_provider that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {card_providerFindUniqueOrThrowArgs} args - Arguments to find a Card_provider
     * @example
     * // Get one Card_provider
     * const card_provider = await prisma.card_provider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends card_providerFindUniqueOrThrowArgs>(args: SelectSubset<T, card_providerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__card_providerClient<$Result.GetResult<Prisma.$card_providerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Card_provider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {card_providerFindFirstArgs} args - Arguments to find a Card_provider
     * @example
     * // Get one Card_provider
     * const card_provider = await prisma.card_provider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends card_providerFindFirstArgs>(args?: SelectSubset<T, card_providerFindFirstArgs<ExtArgs>>): Prisma__card_providerClient<$Result.GetResult<Prisma.$card_providerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Card_provider that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {card_providerFindFirstOrThrowArgs} args - Arguments to find a Card_provider
     * @example
     * // Get one Card_provider
     * const card_provider = await prisma.card_provider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends card_providerFindFirstOrThrowArgs>(args?: SelectSubset<T, card_providerFindFirstOrThrowArgs<ExtArgs>>): Prisma__card_providerClient<$Result.GetResult<Prisma.$card_providerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Card_providers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {card_providerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Card_providers
     * const card_providers = await prisma.card_provider.findMany()
     * 
     * // Get first 10 Card_providers
     * const card_providers = await prisma.card_provider.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const card_providerWithIdOnly = await prisma.card_provider.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends card_providerFindManyArgs>(args?: SelectSubset<T, card_providerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$card_providerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Card_provider.
     * @param {card_providerCreateArgs} args - Arguments to create a Card_provider.
     * @example
     * // Create one Card_provider
     * const Card_provider = await prisma.card_provider.create({
     *   data: {
     *     // ... data to create a Card_provider
     *   }
     * })
     * 
     */
    create<T extends card_providerCreateArgs>(args: SelectSubset<T, card_providerCreateArgs<ExtArgs>>): Prisma__card_providerClient<$Result.GetResult<Prisma.$card_providerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Card_providers.
     * @param {card_providerCreateManyArgs} args - Arguments to create many Card_providers.
     * @example
     * // Create many Card_providers
     * const card_provider = await prisma.card_provider.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends card_providerCreateManyArgs>(args?: SelectSubset<T, card_providerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Card_providers and returns the data saved in the database.
     * @param {card_providerCreateManyAndReturnArgs} args - Arguments to create many Card_providers.
     * @example
     * // Create many Card_providers
     * const card_provider = await prisma.card_provider.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Card_providers and only return the `id`
     * const card_providerWithIdOnly = await prisma.card_provider.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends card_providerCreateManyAndReturnArgs>(args?: SelectSubset<T, card_providerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$card_providerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Card_provider.
     * @param {card_providerDeleteArgs} args - Arguments to delete one Card_provider.
     * @example
     * // Delete one Card_provider
     * const Card_provider = await prisma.card_provider.delete({
     *   where: {
     *     // ... filter to delete one Card_provider
     *   }
     * })
     * 
     */
    delete<T extends card_providerDeleteArgs>(args: SelectSubset<T, card_providerDeleteArgs<ExtArgs>>): Prisma__card_providerClient<$Result.GetResult<Prisma.$card_providerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Card_provider.
     * @param {card_providerUpdateArgs} args - Arguments to update one Card_provider.
     * @example
     * // Update one Card_provider
     * const card_provider = await prisma.card_provider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends card_providerUpdateArgs>(args: SelectSubset<T, card_providerUpdateArgs<ExtArgs>>): Prisma__card_providerClient<$Result.GetResult<Prisma.$card_providerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Card_providers.
     * @param {card_providerDeleteManyArgs} args - Arguments to filter Card_providers to delete.
     * @example
     * // Delete a few Card_providers
     * const { count } = await prisma.card_provider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends card_providerDeleteManyArgs>(args?: SelectSubset<T, card_providerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Card_providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {card_providerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Card_providers
     * const card_provider = await prisma.card_provider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends card_providerUpdateManyArgs>(args: SelectSubset<T, card_providerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Card_providers and returns the data updated in the database.
     * @param {card_providerUpdateManyAndReturnArgs} args - Arguments to update many Card_providers.
     * @example
     * // Update many Card_providers
     * const card_provider = await prisma.card_provider.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Card_providers and only return the `id`
     * const card_providerWithIdOnly = await prisma.card_provider.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends card_providerUpdateManyAndReturnArgs>(args: SelectSubset<T, card_providerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$card_providerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Card_provider.
     * @param {card_providerUpsertArgs} args - Arguments to update or create a Card_provider.
     * @example
     * // Update or create a Card_provider
     * const card_provider = await prisma.card_provider.upsert({
     *   create: {
     *     // ... data to create a Card_provider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Card_provider we want to update
     *   }
     * })
     */
    upsert<T extends card_providerUpsertArgs>(args: SelectSubset<T, card_providerUpsertArgs<ExtArgs>>): Prisma__card_providerClient<$Result.GetResult<Prisma.$card_providerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Card_providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {card_providerCountArgs} args - Arguments to filter Card_providers to count.
     * @example
     * // Count the number of Card_providers
     * const count = await prisma.card_provider.count({
     *   where: {
     *     // ... the filter for the Card_providers we want to count
     *   }
     * })
    **/
    count<T extends card_providerCountArgs>(
      args?: Subset<T, card_providerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Card_providerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Card_provider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Card_providerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Card_providerAggregateArgs>(args: Subset<T, Card_providerAggregateArgs>): Prisma.PrismaPromise<GetCard_providerAggregateType<T>>

    /**
     * Group by Card_provider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {card_providerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends card_providerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: card_providerGroupByArgs['orderBy'] }
        : { orderBy?: card_providerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, card_providerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCard_providerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the card_provider model
   */
  readonly fields: card_providerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for card_provider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__card_providerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    card<T extends card_provider$cardArgs<ExtArgs> = {}>(args?: Subset<T, card_provider$cardArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the card_provider model
   */
  interface card_providerFieldRefs {
    readonly id: FieldRef<"card_provider", 'BigInt'>
    readonly name: FieldRef<"card_provider", 'String'>
    readonly created_at: FieldRef<"card_provider", 'DateTime'>
    readonly updated_at: FieldRef<"card_provider", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * card_provider findUnique
   */
  export type card_providerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card_provider
     */
    select?: card_providerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card_provider
     */
    omit?: card_providerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: card_providerInclude<ExtArgs> | null
    /**
     * Filter, which card_provider to fetch.
     */
    where: card_providerWhereUniqueInput
  }

  /**
   * card_provider findUniqueOrThrow
   */
  export type card_providerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card_provider
     */
    select?: card_providerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card_provider
     */
    omit?: card_providerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: card_providerInclude<ExtArgs> | null
    /**
     * Filter, which card_provider to fetch.
     */
    where: card_providerWhereUniqueInput
  }

  /**
   * card_provider findFirst
   */
  export type card_providerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card_provider
     */
    select?: card_providerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card_provider
     */
    omit?: card_providerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: card_providerInclude<ExtArgs> | null
    /**
     * Filter, which card_provider to fetch.
     */
    where?: card_providerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of card_providers to fetch.
     */
    orderBy?: card_providerOrderByWithRelationInput | card_providerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for card_providers.
     */
    cursor?: card_providerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` card_providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` card_providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of card_providers.
     */
    distinct?: Card_providerScalarFieldEnum | Card_providerScalarFieldEnum[]
  }

  /**
   * card_provider findFirstOrThrow
   */
  export type card_providerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card_provider
     */
    select?: card_providerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card_provider
     */
    omit?: card_providerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: card_providerInclude<ExtArgs> | null
    /**
     * Filter, which card_provider to fetch.
     */
    where?: card_providerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of card_providers to fetch.
     */
    orderBy?: card_providerOrderByWithRelationInput | card_providerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for card_providers.
     */
    cursor?: card_providerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` card_providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` card_providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of card_providers.
     */
    distinct?: Card_providerScalarFieldEnum | Card_providerScalarFieldEnum[]
  }

  /**
   * card_provider findMany
   */
  export type card_providerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card_provider
     */
    select?: card_providerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card_provider
     */
    omit?: card_providerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: card_providerInclude<ExtArgs> | null
    /**
     * Filter, which card_providers to fetch.
     */
    where?: card_providerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of card_providers to fetch.
     */
    orderBy?: card_providerOrderByWithRelationInput | card_providerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing card_providers.
     */
    cursor?: card_providerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` card_providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` card_providers.
     */
    skip?: number
    distinct?: Card_providerScalarFieldEnum | Card_providerScalarFieldEnum[]
  }

  /**
   * card_provider create
   */
  export type card_providerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card_provider
     */
    select?: card_providerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card_provider
     */
    omit?: card_providerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: card_providerInclude<ExtArgs> | null
    /**
     * The data needed to create a card_provider.
     */
    data: XOR<card_providerCreateInput, card_providerUncheckedCreateInput>
  }

  /**
   * card_provider createMany
   */
  export type card_providerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many card_providers.
     */
    data: card_providerCreateManyInput | card_providerCreateManyInput[]
  }

  /**
   * card_provider createManyAndReturn
   */
  export type card_providerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card_provider
     */
    select?: card_providerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the card_provider
     */
    omit?: card_providerOmit<ExtArgs> | null
    /**
     * The data used to create many card_providers.
     */
    data: card_providerCreateManyInput | card_providerCreateManyInput[]
  }

  /**
   * card_provider update
   */
  export type card_providerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card_provider
     */
    select?: card_providerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card_provider
     */
    omit?: card_providerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: card_providerInclude<ExtArgs> | null
    /**
     * The data needed to update a card_provider.
     */
    data: XOR<card_providerUpdateInput, card_providerUncheckedUpdateInput>
    /**
     * Choose, which card_provider to update.
     */
    where: card_providerWhereUniqueInput
  }

  /**
   * card_provider updateMany
   */
  export type card_providerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update card_providers.
     */
    data: XOR<card_providerUpdateManyMutationInput, card_providerUncheckedUpdateManyInput>
    /**
     * Filter which card_providers to update
     */
    where?: card_providerWhereInput
    /**
     * Limit how many card_providers to update.
     */
    limit?: number
  }

  /**
   * card_provider updateManyAndReturn
   */
  export type card_providerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card_provider
     */
    select?: card_providerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the card_provider
     */
    omit?: card_providerOmit<ExtArgs> | null
    /**
     * The data used to update card_providers.
     */
    data: XOR<card_providerUpdateManyMutationInput, card_providerUncheckedUpdateManyInput>
    /**
     * Filter which card_providers to update
     */
    where?: card_providerWhereInput
    /**
     * Limit how many card_providers to update.
     */
    limit?: number
  }

  /**
   * card_provider upsert
   */
  export type card_providerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card_provider
     */
    select?: card_providerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card_provider
     */
    omit?: card_providerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: card_providerInclude<ExtArgs> | null
    /**
     * The filter to search for the card_provider to update in case it exists.
     */
    where: card_providerWhereUniqueInput
    /**
     * In case the card_provider found by the `where` argument doesn't exist, create a new card_provider with this data.
     */
    create: XOR<card_providerCreateInput, card_providerUncheckedCreateInput>
    /**
     * In case the card_provider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<card_providerUpdateInput, card_providerUncheckedUpdateInput>
  }

  /**
   * card_provider delete
   */
  export type card_providerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card_provider
     */
    select?: card_providerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card_provider
     */
    omit?: card_providerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: card_providerInclude<ExtArgs> | null
    /**
     * Filter which card_provider to delete.
     */
    where: card_providerWhereUniqueInput
  }

  /**
   * card_provider deleteMany
   */
  export type card_providerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which card_providers to delete
     */
    where?: card_providerWhereInput
    /**
     * Limit how many card_providers to delete.
     */
    limit?: number
  }

  /**
   * card_provider.card
   */
  export type card_provider$cardArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card
     */
    select?: cardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card
     */
    omit?: cardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cardInclude<ExtArgs> | null
    where?: cardWhereInput
    orderBy?: cardOrderByWithRelationInput | cardOrderByWithRelationInput[]
    cursor?: cardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * card_provider without action
   */
  export type card_providerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the card_provider
     */
    select?: card_providerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the card_provider
     */
    omit?: card_providerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: card_providerInclude<ExtArgs> | null
  }


  /**
   * Model credential_record
   */

  export type AggregateCredential_record = {
    _count: Credential_recordCountAggregateOutputType | null
    _min: Credential_recordMinAggregateOutputType | null
    _max: Credential_recordMaxAggregateOutputType | null
  }

  export type Credential_recordMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    credential_type: string | null
    service_name: string | null
    identifier: string | null
    secret_token: string | null
    secret_hash: string | null
    secret_last4: string | null
    masked_secret: string | null
    url: string | null
    notes: string | null
    metadata: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Credential_recordMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    credential_type: string | null
    service_name: string | null
    identifier: string | null
    secret_token: string | null
    secret_hash: string | null
    secret_last4: string | null
    masked_secret: string | null
    url: string | null
    notes: string | null
    metadata: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Credential_recordCountAggregateOutputType = {
    id: number
    user_id: number
    credential_type: number
    service_name: number
    identifier: number
    secret_token: number
    secret_hash: number
    secret_last4: number
    masked_secret: number
    url: number
    notes: number
    metadata: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Credential_recordMinAggregateInputType = {
    id?: true
    user_id?: true
    credential_type?: true
    service_name?: true
    identifier?: true
    secret_token?: true
    secret_hash?: true
    secret_last4?: true
    masked_secret?: true
    url?: true
    notes?: true
    metadata?: true
    created_at?: true
    updated_at?: true
  }

  export type Credential_recordMaxAggregateInputType = {
    id?: true
    user_id?: true
    credential_type?: true
    service_name?: true
    identifier?: true
    secret_token?: true
    secret_hash?: true
    secret_last4?: true
    masked_secret?: true
    url?: true
    notes?: true
    metadata?: true
    created_at?: true
    updated_at?: true
  }

  export type Credential_recordCountAggregateInputType = {
    id?: true
    user_id?: true
    credential_type?: true
    service_name?: true
    identifier?: true
    secret_token?: true
    secret_hash?: true
    secret_last4?: true
    masked_secret?: true
    url?: true
    notes?: true
    metadata?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Credential_recordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which credential_record to aggregate.
     */
    where?: credential_recordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of credential_records to fetch.
     */
    orderBy?: credential_recordOrderByWithRelationInput | credential_recordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: credential_recordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` credential_records from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` credential_records.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned credential_records
    **/
    _count?: true | Credential_recordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Credential_recordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Credential_recordMaxAggregateInputType
  }

  export type GetCredential_recordAggregateType<T extends Credential_recordAggregateArgs> = {
        [P in keyof T & keyof AggregateCredential_record]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCredential_record[P]>
      : GetScalarType<T[P], AggregateCredential_record[P]>
  }




  export type credential_recordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: credential_recordWhereInput
    orderBy?: credential_recordOrderByWithAggregationInput | credential_recordOrderByWithAggregationInput[]
    by: Credential_recordScalarFieldEnum[] | Credential_recordScalarFieldEnum
    having?: credential_recordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Credential_recordCountAggregateInputType | true
    _min?: Credential_recordMinAggregateInputType
    _max?: Credential_recordMaxAggregateInputType
  }

  export type Credential_recordGroupByOutputType = {
    id: string
    user_id: string
    credential_type: string
    service_name: string
    identifier: string | null
    secret_token: string
    secret_hash: string
    secret_last4: string
    masked_secret: string
    url: string | null
    notes: string | null
    metadata: string | null
    created_at: Date
    updated_at: Date
    _count: Credential_recordCountAggregateOutputType | null
    _min: Credential_recordMinAggregateOutputType | null
    _max: Credential_recordMaxAggregateOutputType | null
  }

  type GetCredential_recordGroupByPayload<T extends credential_recordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Credential_recordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Credential_recordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Credential_recordGroupByOutputType[P]>
            : GetScalarType<T[P], Credential_recordGroupByOutputType[P]>
        }
      >
    >


  export type credential_recordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    credential_type?: boolean
    service_name?: boolean
    identifier?: boolean
    secret_token?: boolean
    secret_hash?: boolean
    secret_last4?: boolean
    masked_secret?: boolean
    url?: boolean
    notes?: boolean
    metadata?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credential_record"]>

  export type credential_recordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    credential_type?: boolean
    service_name?: boolean
    identifier?: boolean
    secret_token?: boolean
    secret_hash?: boolean
    secret_last4?: boolean
    masked_secret?: boolean
    url?: boolean
    notes?: boolean
    metadata?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credential_record"]>

  export type credential_recordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    credential_type?: boolean
    service_name?: boolean
    identifier?: boolean
    secret_token?: boolean
    secret_hash?: boolean
    secret_last4?: boolean
    masked_secret?: boolean
    url?: boolean
    notes?: boolean
    metadata?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credential_record"]>

  export type credential_recordSelectScalar = {
    id?: boolean
    user_id?: boolean
    credential_type?: boolean
    service_name?: boolean
    identifier?: boolean
    secret_token?: boolean
    secret_hash?: boolean
    secret_last4?: boolean
    masked_secret?: boolean
    url?: boolean
    notes?: boolean
    metadata?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type credential_recordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "credential_type" | "service_name" | "identifier" | "secret_token" | "secret_hash" | "secret_last4" | "masked_secret" | "url" | "notes" | "metadata" | "created_at" | "updated_at", ExtArgs["result"]["credential_record"]>
  export type credential_recordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type credential_recordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type credential_recordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $credential_recordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "credential_record"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      credential_type: string
      service_name: string
      identifier: string | null
      secret_token: string
      secret_hash: string
      secret_last4: string
      masked_secret: string
      url: string | null
      notes: string | null
      metadata: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["credential_record"]>
    composites: {}
  }

  type credential_recordGetPayload<S extends boolean | null | undefined | credential_recordDefaultArgs> = $Result.GetResult<Prisma.$credential_recordPayload, S>

  type credential_recordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<credential_recordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Credential_recordCountAggregateInputType | true
    }

  export interface credential_recordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['credential_record'], meta: { name: 'credential_record' } }
    /**
     * Find zero or one Credential_record that matches the filter.
     * @param {credential_recordFindUniqueArgs} args - Arguments to find a Credential_record
     * @example
     * // Get one Credential_record
     * const credential_record = await prisma.credential_record.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends credential_recordFindUniqueArgs>(args: SelectSubset<T, credential_recordFindUniqueArgs<ExtArgs>>): Prisma__credential_recordClient<$Result.GetResult<Prisma.$credential_recordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Credential_record that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {credential_recordFindUniqueOrThrowArgs} args - Arguments to find a Credential_record
     * @example
     * // Get one Credential_record
     * const credential_record = await prisma.credential_record.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends credential_recordFindUniqueOrThrowArgs>(args: SelectSubset<T, credential_recordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__credential_recordClient<$Result.GetResult<Prisma.$credential_recordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Credential_record that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {credential_recordFindFirstArgs} args - Arguments to find a Credential_record
     * @example
     * // Get one Credential_record
     * const credential_record = await prisma.credential_record.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends credential_recordFindFirstArgs>(args?: SelectSubset<T, credential_recordFindFirstArgs<ExtArgs>>): Prisma__credential_recordClient<$Result.GetResult<Prisma.$credential_recordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Credential_record that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {credential_recordFindFirstOrThrowArgs} args - Arguments to find a Credential_record
     * @example
     * // Get one Credential_record
     * const credential_record = await prisma.credential_record.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends credential_recordFindFirstOrThrowArgs>(args?: SelectSubset<T, credential_recordFindFirstOrThrowArgs<ExtArgs>>): Prisma__credential_recordClient<$Result.GetResult<Prisma.$credential_recordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Credential_records that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {credential_recordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Credential_records
     * const credential_records = await prisma.credential_record.findMany()
     * 
     * // Get first 10 Credential_records
     * const credential_records = await prisma.credential_record.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const credential_recordWithIdOnly = await prisma.credential_record.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends credential_recordFindManyArgs>(args?: SelectSubset<T, credential_recordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$credential_recordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Credential_record.
     * @param {credential_recordCreateArgs} args - Arguments to create a Credential_record.
     * @example
     * // Create one Credential_record
     * const Credential_record = await prisma.credential_record.create({
     *   data: {
     *     // ... data to create a Credential_record
     *   }
     * })
     * 
     */
    create<T extends credential_recordCreateArgs>(args: SelectSubset<T, credential_recordCreateArgs<ExtArgs>>): Prisma__credential_recordClient<$Result.GetResult<Prisma.$credential_recordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Credential_records.
     * @param {credential_recordCreateManyArgs} args - Arguments to create many Credential_records.
     * @example
     * // Create many Credential_records
     * const credential_record = await prisma.credential_record.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends credential_recordCreateManyArgs>(args?: SelectSubset<T, credential_recordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Credential_records and returns the data saved in the database.
     * @param {credential_recordCreateManyAndReturnArgs} args - Arguments to create many Credential_records.
     * @example
     * // Create many Credential_records
     * const credential_record = await prisma.credential_record.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Credential_records and only return the `id`
     * const credential_recordWithIdOnly = await prisma.credential_record.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends credential_recordCreateManyAndReturnArgs>(args?: SelectSubset<T, credential_recordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$credential_recordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Credential_record.
     * @param {credential_recordDeleteArgs} args - Arguments to delete one Credential_record.
     * @example
     * // Delete one Credential_record
     * const Credential_record = await prisma.credential_record.delete({
     *   where: {
     *     // ... filter to delete one Credential_record
     *   }
     * })
     * 
     */
    delete<T extends credential_recordDeleteArgs>(args: SelectSubset<T, credential_recordDeleteArgs<ExtArgs>>): Prisma__credential_recordClient<$Result.GetResult<Prisma.$credential_recordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Credential_record.
     * @param {credential_recordUpdateArgs} args - Arguments to update one Credential_record.
     * @example
     * // Update one Credential_record
     * const credential_record = await prisma.credential_record.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends credential_recordUpdateArgs>(args: SelectSubset<T, credential_recordUpdateArgs<ExtArgs>>): Prisma__credential_recordClient<$Result.GetResult<Prisma.$credential_recordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Credential_records.
     * @param {credential_recordDeleteManyArgs} args - Arguments to filter Credential_records to delete.
     * @example
     * // Delete a few Credential_records
     * const { count } = await prisma.credential_record.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends credential_recordDeleteManyArgs>(args?: SelectSubset<T, credential_recordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Credential_records.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {credential_recordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Credential_records
     * const credential_record = await prisma.credential_record.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends credential_recordUpdateManyArgs>(args: SelectSubset<T, credential_recordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Credential_records and returns the data updated in the database.
     * @param {credential_recordUpdateManyAndReturnArgs} args - Arguments to update many Credential_records.
     * @example
     * // Update many Credential_records
     * const credential_record = await prisma.credential_record.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Credential_records and only return the `id`
     * const credential_recordWithIdOnly = await prisma.credential_record.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends credential_recordUpdateManyAndReturnArgs>(args: SelectSubset<T, credential_recordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$credential_recordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Credential_record.
     * @param {credential_recordUpsertArgs} args - Arguments to update or create a Credential_record.
     * @example
     * // Update or create a Credential_record
     * const credential_record = await prisma.credential_record.upsert({
     *   create: {
     *     // ... data to create a Credential_record
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Credential_record we want to update
     *   }
     * })
     */
    upsert<T extends credential_recordUpsertArgs>(args: SelectSubset<T, credential_recordUpsertArgs<ExtArgs>>): Prisma__credential_recordClient<$Result.GetResult<Prisma.$credential_recordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Credential_records.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {credential_recordCountArgs} args - Arguments to filter Credential_records to count.
     * @example
     * // Count the number of Credential_records
     * const count = await prisma.credential_record.count({
     *   where: {
     *     // ... the filter for the Credential_records we want to count
     *   }
     * })
    **/
    count<T extends credential_recordCountArgs>(
      args?: Subset<T, credential_recordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Credential_recordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Credential_record.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Credential_recordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Credential_recordAggregateArgs>(args: Subset<T, Credential_recordAggregateArgs>): Prisma.PrismaPromise<GetCredential_recordAggregateType<T>>

    /**
     * Group by Credential_record.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {credential_recordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends credential_recordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: credential_recordGroupByArgs['orderBy'] }
        : { orderBy?: credential_recordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, credential_recordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCredential_recordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the credential_record model
   */
  readonly fields: credential_recordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for credential_record.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__credential_recordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the credential_record model
   */
  interface credential_recordFieldRefs {
    readonly id: FieldRef<"credential_record", 'String'>
    readonly user_id: FieldRef<"credential_record", 'String'>
    readonly credential_type: FieldRef<"credential_record", 'String'>
    readonly service_name: FieldRef<"credential_record", 'String'>
    readonly identifier: FieldRef<"credential_record", 'String'>
    readonly secret_token: FieldRef<"credential_record", 'String'>
    readonly secret_hash: FieldRef<"credential_record", 'String'>
    readonly secret_last4: FieldRef<"credential_record", 'String'>
    readonly masked_secret: FieldRef<"credential_record", 'String'>
    readonly url: FieldRef<"credential_record", 'String'>
    readonly notes: FieldRef<"credential_record", 'String'>
    readonly metadata: FieldRef<"credential_record", 'String'>
    readonly created_at: FieldRef<"credential_record", 'DateTime'>
    readonly updated_at: FieldRef<"credential_record", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * credential_record findUnique
   */
  export type credential_recordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credential_record
     */
    select?: credential_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credential_record
     */
    omit?: credential_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credential_recordInclude<ExtArgs> | null
    /**
     * Filter, which credential_record to fetch.
     */
    where: credential_recordWhereUniqueInput
  }

  /**
   * credential_record findUniqueOrThrow
   */
  export type credential_recordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credential_record
     */
    select?: credential_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credential_record
     */
    omit?: credential_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credential_recordInclude<ExtArgs> | null
    /**
     * Filter, which credential_record to fetch.
     */
    where: credential_recordWhereUniqueInput
  }

  /**
   * credential_record findFirst
   */
  export type credential_recordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credential_record
     */
    select?: credential_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credential_record
     */
    omit?: credential_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credential_recordInclude<ExtArgs> | null
    /**
     * Filter, which credential_record to fetch.
     */
    where?: credential_recordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of credential_records to fetch.
     */
    orderBy?: credential_recordOrderByWithRelationInput | credential_recordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for credential_records.
     */
    cursor?: credential_recordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` credential_records from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` credential_records.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of credential_records.
     */
    distinct?: Credential_recordScalarFieldEnum | Credential_recordScalarFieldEnum[]
  }

  /**
   * credential_record findFirstOrThrow
   */
  export type credential_recordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credential_record
     */
    select?: credential_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credential_record
     */
    omit?: credential_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credential_recordInclude<ExtArgs> | null
    /**
     * Filter, which credential_record to fetch.
     */
    where?: credential_recordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of credential_records to fetch.
     */
    orderBy?: credential_recordOrderByWithRelationInput | credential_recordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for credential_records.
     */
    cursor?: credential_recordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` credential_records from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` credential_records.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of credential_records.
     */
    distinct?: Credential_recordScalarFieldEnum | Credential_recordScalarFieldEnum[]
  }

  /**
   * credential_record findMany
   */
  export type credential_recordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credential_record
     */
    select?: credential_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credential_record
     */
    omit?: credential_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credential_recordInclude<ExtArgs> | null
    /**
     * Filter, which credential_records to fetch.
     */
    where?: credential_recordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of credential_records to fetch.
     */
    orderBy?: credential_recordOrderByWithRelationInput | credential_recordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing credential_records.
     */
    cursor?: credential_recordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` credential_records from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` credential_records.
     */
    skip?: number
    distinct?: Credential_recordScalarFieldEnum | Credential_recordScalarFieldEnum[]
  }

  /**
   * credential_record create
   */
  export type credential_recordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credential_record
     */
    select?: credential_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credential_record
     */
    omit?: credential_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credential_recordInclude<ExtArgs> | null
    /**
     * The data needed to create a credential_record.
     */
    data: XOR<credential_recordCreateInput, credential_recordUncheckedCreateInput>
  }

  /**
   * credential_record createMany
   */
  export type credential_recordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many credential_records.
     */
    data: credential_recordCreateManyInput | credential_recordCreateManyInput[]
  }

  /**
   * credential_record createManyAndReturn
   */
  export type credential_recordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credential_record
     */
    select?: credential_recordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the credential_record
     */
    omit?: credential_recordOmit<ExtArgs> | null
    /**
     * The data used to create many credential_records.
     */
    data: credential_recordCreateManyInput | credential_recordCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credential_recordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * credential_record update
   */
  export type credential_recordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credential_record
     */
    select?: credential_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credential_record
     */
    omit?: credential_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credential_recordInclude<ExtArgs> | null
    /**
     * The data needed to update a credential_record.
     */
    data: XOR<credential_recordUpdateInput, credential_recordUncheckedUpdateInput>
    /**
     * Choose, which credential_record to update.
     */
    where: credential_recordWhereUniqueInput
  }

  /**
   * credential_record updateMany
   */
  export type credential_recordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update credential_records.
     */
    data: XOR<credential_recordUpdateManyMutationInput, credential_recordUncheckedUpdateManyInput>
    /**
     * Filter which credential_records to update
     */
    where?: credential_recordWhereInput
    /**
     * Limit how many credential_records to update.
     */
    limit?: number
  }

  /**
   * credential_record updateManyAndReturn
   */
  export type credential_recordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credential_record
     */
    select?: credential_recordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the credential_record
     */
    omit?: credential_recordOmit<ExtArgs> | null
    /**
     * The data used to update credential_records.
     */
    data: XOR<credential_recordUpdateManyMutationInput, credential_recordUncheckedUpdateManyInput>
    /**
     * Filter which credential_records to update
     */
    where?: credential_recordWhereInput
    /**
     * Limit how many credential_records to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credential_recordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * credential_record upsert
   */
  export type credential_recordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credential_record
     */
    select?: credential_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credential_record
     */
    omit?: credential_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credential_recordInclude<ExtArgs> | null
    /**
     * The filter to search for the credential_record to update in case it exists.
     */
    where: credential_recordWhereUniqueInput
    /**
     * In case the credential_record found by the `where` argument doesn't exist, create a new credential_record with this data.
     */
    create: XOR<credential_recordCreateInput, credential_recordUncheckedCreateInput>
    /**
     * In case the credential_record was found with the provided `where` argument, update it with this data.
     */
    update: XOR<credential_recordUpdateInput, credential_recordUncheckedUpdateInput>
  }

  /**
   * credential_record delete
   */
  export type credential_recordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credential_record
     */
    select?: credential_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credential_record
     */
    omit?: credential_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credential_recordInclude<ExtArgs> | null
    /**
     * Filter which credential_record to delete.
     */
    where: credential_recordWhereUniqueInput
  }

  /**
   * credential_record deleteMany
   */
  export type credential_recordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which credential_records to delete
     */
    where?: credential_recordWhereInput
    /**
     * Limit how many credential_records to delete.
     */
    limit?: number
  }

  /**
   * credential_record without action
   */
  export type credential_recordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credential_record
     */
    select?: credential_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credential_record
     */
    omit?: credential_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credential_recordInclude<ExtArgs> | null
  }


  /**
   * Model document_access_audit
   */

  export type AggregateDocument_access_audit = {
    _count: Document_access_auditCountAggregateOutputType | null
    _avg: Document_access_auditAvgAggregateOutputType | null
    _sum: Document_access_auditSumAggregateOutputType | null
    _min: Document_access_auditMinAggregateOutputType | null
    _max: Document_access_auditMaxAggregateOutputType | null
  }

  export type Document_access_auditAvgAggregateOutputType = {
    id: number | null
  }

  export type Document_access_auditSumAggregateOutputType = {
    id: bigint | null
  }

  export type Document_access_auditMinAggregateOutputType = {
    id: bigint | null
    document_id: string | null
    actor_user_id: string | null
    action: string | null
    context: string | null
    created_at: Date | null
  }

  export type Document_access_auditMaxAggregateOutputType = {
    id: bigint | null
    document_id: string | null
    actor_user_id: string | null
    action: string | null
    context: string | null
    created_at: Date | null
  }

  export type Document_access_auditCountAggregateOutputType = {
    id: number
    document_id: number
    actor_user_id: number
    action: number
    context: number
    created_at: number
    _all: number
  }


  export type Document_access_auditAvgAggregateInputType = {
    id?: true
  }

  export type Document_access_auditSumAggregateInputType = {
    id?: true
  }

  export type Document_access_auditMinAggregateInputType = {
    id?: true
    document_id?: true
    actor_user_id?: true
    action?: true
    context?: true
    created_at?: true
  }

  export type Document_access_auditMaxAggregateInputType = {
    id?: true
    document_id?: true
    actor_user_id?: true
    action?: true
    context?: true
    created_at?: true
  }

  export type Document_access_auditCountAggregateInputType = {
    id?: true
    document_id?: true
    actor_user_id?: true
    action?: true
    context?: true
    created_at?: true
    _all?: true
  }

  export type Document_access_auditAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which document_access_audit to aggregate.
     */
    where?: document_access_auditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of document_access_audits to fetch.
     */
    orderBy?: document_access_auditOrderByWithRelationInput | document_access_auditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: document_access_auditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` document_access_audits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` document_access_audits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned document_access_audits
    **/
    _count?: true | Document_access_auditCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Document_access_auditAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Document_access_auditSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Document_access_auditMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Document_access_auditMaxAggregateInputType
  }

  export type GetDocument_access_auditAggregateType<T extends Document_access_auditAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument_access_audit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument_access_audit[P]>
      : GetScalarType<T[P], AggregateDocument_access_audit[P]>
  }




  export type document_access_auditGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: document_access_auditWhereInput
    orderBy?: document_access_auditOrderByWithAggregationInput | document_access_auditOrderByWithAggregationInput[]
    by: Document_access_auditScalarFieldEnum[] | Document_access_auditScalarFieldEnum
    having?: document_access_auditScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Document_access_auditCountAggregateInputType | true
    _avg?: Document_access_auditAvgAggregateInputType
    _sum?: Document_access_auditSumAggregateInputType
    _min?: Document_access_auditMinAggregateInputType
    _max?: Document_access_auditMaxAggregateInputType
  }

  export type Document_access_auditGroupByOutputType = {
    id: bigint
    document_id: string | null
    actor_user_id: string | null
    action: string
    context: string | null
    created_at: Date
    _count: Document_access_auditCountAggregateOutputType | null
    _avg: Document_access_auditAvgAggregateOutputType | null
    _sum: Document_access_auditSumAggregateOutputType | null
    _min: Document_access_auditMinAggregateOutputType | null
    _max: Document_access_auditMaxAggregateOutputType | null
  }

  type GetDocument_access_auditGroupByPayload<T extends document_access_auditGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Document_access_auditGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Document_access_auditGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Document_access_auditGroupByOutputType[P]>
            : GetScalarType<T[P], Document_access_auditGroupByOutputType[P]>
        }
      >
    >


  export type document_access_auditSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_id?: boolean
    actor_user_id?: boolean
    action?: boolean
    context?: boolean
    created_at?: boolean
    user?: boolean | document_access_audit$userArgs<ExtArgs>
    document_record?: boolean | document_access_audit$document_recordArgs<ExtArgs>
  }, ExtArgs["result"]["document_access_audit"]>

  export type document_access_auditSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_id?: boolean
    actor_user_id?: boolean
    action?: boolean
    context?: boolean
    created_at?: boolean
    user?: boolean | document_access_audit$userArgs<ExtArgs>
    document_record?: boolean | document_access_audit$document_recordArgs<ExtArgs>
  }, ExtArgs["result"]["document_access_audit"]>

  export type document_access_auditSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_id?: boolean
    actor_user_id?: boolean
    action?: boolean
    context?: boolean
    created_at?: boolean
    user?: boolean | document_access_audit$userArgs<ExtArgs>
    document_record?: boolean | document_access_audit$document_recordArgs<ExtArgs>
  }, ExtArgs["result"]["document_access_audit"]>

  export type document_access_auditSelectScalar = {
    id?: boolean
    document_id?: boolean
    actor_user_id?: boolean
    action?: boolean
    context?: boolean
    created_at?: boolean
  }

  export type document_access_auditOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "document_id" | "actor_user_id" | "action" | "context" | "created_at", ExtArgs["result"]["document_access_audit"]>
  export type document_access_auditInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | document_access_audit$userArgs<ExtArgs>
    document_record?: boolean | document_access_audit$document_recordArgs<ExtArgs>
  }
  export type document_access_auditIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | document_access_audit$userArgs<ExtArgs>
    document_record?: boolean | document_access_audit$document_recordArgs<ExtArgs>
  }
  export type document_access_auditIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | document_access_audit$userArgs<ExtArgs>
    document_record?: boolean | document_access_audit$document_recordArgs<ExtArgs>
  }

  export type $document_access_auditPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "document_access_audit"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      document_record: Prisma.$document_recordPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      document_id: string | null
      actor_user_id: string | null
      action: string
      context: string | null
      created_at: Date
    }, ExtArgs["result"]["document_access_audit"]>
    composites: {}
  }

  type document_access_auditGetPayload<S extends boolean | null | undefined | document_access_auditDefaultArgs> = $Result.GetResult<Prisma.$document_access_auditPayload, S>

  type document_access_auditCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<document_access_auditFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Document_access_auditCountAggregateInputType | true
    }

  export interface document_access_auditDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['document_access_audit'], meta: { name: 'document_access_audit' } }
    /**
     * Find zero or one Document_access_audit that matches the filter.
     * @param {document_access_auditFindUniqueArgs} args - Arguments to find a Document_access_audit
     * @example
     * // Get one Document_access_audit
     * const document_access_audit = await prisma.document_access_audit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends document_access_auditFindUniqueArgs>(args: SelectSubset<T, document_access_auditFindUniqueArgs<ExtArgs>>): Prisma__document_access_auditClient<$Result.GetResult<Prisma.$document_access_auditPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document_access_audit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {document_access_auditFindUniqueOrThrowArgs} args - Arguments to find a Document_access_audit
     * @example
     * // Get one Document_access_audit
     * const document_access_audit = await prisma.document_access_audit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends document_access_auditFindUniqueOrThrowArgs>(args: SelectSubset<T, document_access_auditFindUniqueOrThrowArgs<ExtArgs>>): Prisma__document_access_auditClient<$Result.GetResult<Prisma.$document_access_auditPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document_access_audit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_access_auditFindFirstArgs} args - Arguments to find a Document_access_audit
     * @example
     * // Get one Document_access_audit
     * const document_access_audit = await prisma.document_access_audit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends document_access_auditFindFirstArgs>(args?: SelectSubset<T, document_access_auditFindFirstArgs<ExtArgs>>): Prisma__document_access_auditClient<$Result.GetResult<Prisma.$document_access_auditPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document_access_audit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_access_auditFindFirstOrThrowArgs} args - Arguments to find a Document_access_audit
     * @example
     * // Get one Document_access_audit
     * const document_access_audit = await prisma.document_access_audit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends document_access_auditFindFirstOrThrowArgs>(args?: SelectSubset<T, document_access_auditFindFirstOrThrowArgs<ExtArgs>>): Prisma__document_access_auditClient<$Result.GetResult<Prisma.$document_access_auditPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Document_access_audits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_access_auditFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Document_access_audits
     * const document_access_audits = await prisma.document_access_audit.findMany()
     * 
     * // Get first 10 Document_access_audits
     * const document_access_audits = await prisma.document_access_audit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const document_access_auditWithIdOnly = await prisma.document_access_audit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends document_access_auditFindManyArgs>(args?: SelectSubset<T, document_access_auditFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_access_auditPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document_access_audit.
     * @param {document_access_auditCreateArgs} args - Arguments to create a Document_access_audit.
     * @example
     * // Create one Document_access_audit
     * const Document_access_audit = await prisma.document_access_audit.create({
     *   data: {
     *     // ... data to create a Document_access_audit
     *   }
     * })
     * 
     */
    create<T extends document_access_auditCreateArgs>(args: SelectSubset<T, document_access_auditCreateArgs<ExtArgs>>): Prisma__document_access_auditClient<$Result.GetResult<Prisma.$document_access_auditPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Document_access_audits.
     * @param {document_access_auditCreateManyArgs} args - Arguments to create many Document_access_audits.
     * @example
     * // Create many Document_access_audits
     * const document_access_audit = await prisma.document_access_audit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends document_access_auditCreateManyArgs>(args?: SelectSubset<T, document_access_auditCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Document_access_audits and returns the data saved in the database.
     * @param {document_access_auditCreateManyAndReturnArgs} args - Arguments to create many Document_access_audits.
     * @example
     * // Create many Document_access_audits
     * const document_access_audit = await prisma.document_access_audit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Document_access_audits and only return the `id`
     * const document_access_auditWithIdOnly = await prisma.document_access_audit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends document_access_auditCreateManyAndReturnArgs>(args?: SelectSubset<T, document_access_auditCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_access_auditPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document_access_audit.
     * @param {document_access_auditDeleteArgs} args - Arguments to delete one Document_access_audit.
     * @example
     * // Delete one Document_access_audit
     * const Document_access_audit = await prisma.document_access_audit.delete({
     *   where: {
     *     // ... filter to delete one Document_access_audit
     *   }
     * })
     * 
     */
    delete<T extends document_access_auditDeleteArgs>(args: SelectSubset<T, document_access_auditDeleteArgs<ExtArgs>>): Prisma__document_access_auditClient<$Result.GetResult<Prisma.$document_access_auditPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document_access_audit.
     * @param {document_access_auditUpdateArgs} args - Arguments to update one Document_access_audit.
     * @example
     * // Update one Document_access_audit
     * const document_access_audit = await prisma.document_access_audit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends document_access_auditUpdateArgs>(args: SelectSubset<T, document_access_auditUpdateArgs<ExtArgs>>): Prisma__document_access_auditClient<$Result.GetResult<Prisma.$document_access_auditPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Document_access_audits.
     * @param {document_access_auditDeleteManyArgs} args - Arguments to filter Document_access_audits to delete.
     * @example
     * // Delete a few Document_access_audits
     * const { count } = await prisma.document_access_audit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends document_access_auditDeleteManyArgs>(args?: SelectSubset<T, document_access_auditDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Document_access_audits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_access_auditUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Document_access_audits
     * const document_access_audit = await prisma.document_access_audit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends document_access_auditUpdateManyArgs>(args: SelectSubset<T, document_access_auditUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Document_access_audits and returns the data updated in the database.
     * @param {document_access_auditUpdateManyAndReturnArgs} args - Arguments to update many Document_access_audits.
     * @example
     * // Update many Document_access_audits
     * const document_access_audit = await prisma.document_access_audit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Document_access_audits and only return the `id`
     * const document_access_auditWithIdOnly = await prisma.document_access_audit.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends document_access_auditUpdateManyAndReturnArgs>(args: SelectSubset<T, document_access_auditUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_access_auditPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document_access_audit.
     * @param {document_access_auditUpsertArgs} args - Arguments to update or create a Document_access_audit.
     * @example
     * // Update or create a Document_access_audit
     * const document_access_audit = await prisma.document_access_audit.upsert({
     *   create: {
     *     // ... data to create a Document_access_audit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document_access_audit we want to update
     *   }
     * })
     */
    upsert<T extends document_access_auditUpsertArgs>(args: SelectSubset<T, document_access_auditUpsertArgs<ExtArgs>>): Prisma__document_access_auditClient<$Result.GetResult<Prisma.$document_access_auditPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Document_access_audits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_access_auditCountArgs} args - Arguments to filter Document_access_audits to count.
     * @example
     * // Count the number of Document_access_audits
     * const count = await prisma.document_access_audit.count({
     *   where: {
     *     // ... the filter for the Document_access_audits we want to count
     *   }
     * })
    **/
    count<T extends document_access_auditCountArgs>(
      args?: Subset<T, document_access_auditCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Document_access_auditCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document_access_audit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Document_access_auditAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Document_access_auditAggregateArgs>(args: Subset<T, Document_access_auditAggregateArgs>): Prisma.PrismaPromise<GetDocument_access_auditAggregateType<T>>

    /**
     * Group by Document_access_audit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_access_auditGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends document_access_auditGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: document_access_auditGroupByArgs['orderBy'] }
        : { orderBy?: document_access_auditGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, document_access_auditGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocument_access_auditGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the document_access_audit model
   */
  readonly fields: document_access_auditFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for document_access_audit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__document_access_auditClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends document_access_audit$userArgs<ExtArgs> = {}>(args?: Subset<T, document_access_audit$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    document_record<T extends document_access_audit$document_recordArgs<ExtArgs> = {}>(args?: Subset<T, document_access_audit$document_recordArgs<ExtArgs>>): Prisma__document_recordClient<$Result.GetResult<Prisma.$document_recordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the document_access_audit model
   */
  interface document_access_auditFieldRefs {
    readonly id: FieldRef<"document_access_audit", 'BigInt'>
    readonly document_id: FieldRef<"document_access_audit", 'String'>
    readonly actor_user_id: FieldRef<"document_access_audit", 'String'>
    readonly action: FieldRef<"document_access_audit", 'String'>
    readonly context: FieldRef<"document_access_audit", 'String'>
    readonly created_at: FieldRef<"document_access_audit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * document_access_audit findUnique
   */
  export type document_access_auditFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_access_audit
     */
    select?: document_access_auditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_access_audit
     */
    omit?: document_access_auditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_access_auditInclude<ExtArgs> | null
    /**
     * Filter, which document_access_audit to fetch.
     */
    where: document_access_auditWhereUniqueInput
  }

  /**
   * document_access_audit findUniqueOrThrow
   */
  export type document_access_auditFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_access_audit
     */
    select?: document_access_auditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_access_audit
     */
    omit?: document_access_auditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_access_auditInclude<ExtArgs> | null
    /**
     * Filter, which document_access_audit to fetch.
     */
    where: document_access_auditWhereUniqueInput
  }

  /**
   * document_access_audit findFirst
   */
  export type document_access_auditFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_access_audit
     */
    select?: document_access_auditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_access_audit
     */
    omit?: document_access_auditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_access_auditInclude<ExtArgs> | null
    /**
     * Filter, which document_access_audit to fetch.
     */
    where?: document_access_auditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of document_access_audits to fetch.
     */
    orderBy?: document_access_auditOrderByWithRelationInput | document_access_auditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for document_access_audits.
     */
    cursor?: document_access_auditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` document_access_audits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` document_access_audits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of document_access_audits.
     */
    distinct?: Document_access_auditScalarFieldEnum | Document_access_auditScalarFieldEnum[]
  }

  /**
   * document_access_audit findFirstOrThrow
   */
  export type document_access_auditFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_access_audit
     */
    select?: document_access_auditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_access_audit
     */
    omit?: document_access_auditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_access_auditInclude<ExtArgs> | null
    /**
     * Filter, which document_access_audit to fetch.
     */
    where?: document_access_auditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of document_access_audits to fetch.
     */
    orderBy?: document_access_auditOrderByWithRelationInput | document_access_auditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for document_access_audits.
     */
    cursor?: document_access_auditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` document_access_audits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` document_access_audits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of document_access_audits.
     */
    distinct?: Document_access_auditScalarFieldEnum | Document_access_auditScalarFieldEnum[]
  }

  /**
   * document_access_audit findMany
   */
  export type document_access_auditFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_access_audit
     */
    select?: document_access_auditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_access_audit
     */
    omit?: document_access_auditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_access_auditInclude<ExtArgs> | null
    /**
     * Filter, which document_access_audits to fetch.
     */
    where?: document_access_auditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of document_access_audits to fetch.
     */
    orderBy?: document_access_auditOrderByWithRelationInput | document_access_auditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing document_access_audits.
     */
    cursor?: document_access_auditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` document_access_audits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` document_access_audits.
     */
    skip?: number
    distinct?: Document_access_auditScalarFieldEnum | Document_access_auditScalarFieldEnum[]
  }

  /**
   * document_access_audit create
   */
  export type document_access_auditCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_access_audit
     */
    select?: document_access_auditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_access_audit
     */
    omit?: document_access_auditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_access_auditInclude<ExtArgs> | null
    /**
     * The data needed to create a document_access_audit.
     */
    data: XOR<document_access_auditCreateInput, document_access_auditUncheckedCreateInput>
  }

  /**
   * document_access_audit createMany
   */
  export type document_access_auditCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many document_access_audits.
     */
    data: document_access_auditCreateManyInput | document_access_auditCreateManyInput[]
  }

  /**
   * document_access_audit createManyAndReturn
   */
  export type document_access_auditCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_access_audit
     */
    select?: document_access_auditSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the document_access_audit
     */
    omit?: document_access_auditOmit<ExtArgs> | null
    /**
     * The data used to create many document_access_audits.
     */
    data: document_access_auditCreateManyInput | document_access_auditCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_access_auditIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * document_access_audit update
   */
  export type document_access_auditUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_access_audit
     */
    select?: document_access_auditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_access_audit
     */
    omit?: document_access_auditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_access_auditInclude<ExtArgs> | null
    /**
     * The data needed to update a document_access_audit.
     */
    data: XOR<document_access_auditUpdateInput, document_access_auditUncheckedUpdateInput>
    /**
     * Choose, which document_access_audit to update.
     */
    where: document_access_auditWhereUniqueInput
  }

  /**
   * document_access_audit updateMany
   */
  export type document_access_auditUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update document_access_audits.
     */
    data: XOR<document_access_auditUpdateManyMutationInput, document_access_auditUncheckedUpdateManyInput>
    /**
     * Filter which document_access_audits to update
     */
    where?: document_access_auditWhereInput
    /**
     * Limit how many document_access_audits to update.
     */
    limit?: number
  }

  /**
   * document_access_audit updateManyAndReturn
   */
  export type document_access_auditUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_access_audit
     */
    select?: document_access_auditSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the document_access_audit
     */
    omit?: document_access_auditOmit<ExtArgs> | null
    /**
     * The data used to update document_access_audits.
     */
    data: XOR<document_access_auditUpdateManyMutationInput, document_access_auditUncheckedUpdateManyInput>
    /**
     * Filter which document_access_audits to update
     */
    where?: document_access_auditWhereInput
    /**
     * Limit how many document_access_audits to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_access_auditIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * document_access_audit upsert
   */
  export type document_access_auditUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_access_audit
     */
    select?: document_access_auditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_access_audit
     */
    omit?: document_access_auditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_access_auditInclude<ExtArgs> | null
    /**
     * The filter to search for the document_access_audit to update in case it exists.
     */
    where: document_access_auditWhereUniqueInput
    /**
     * In case the document_access_audit found by the `where` argument doesn't exist, create a new document_access_audit with this data.
     */
    create: XOR<document_access_auditCreateInput, document_access_auditUncheckedCreateInput>
    /**
     * In case the document_access_audit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<document_access_auditUpdateInput, document_access_auditUncheckedUpdateInput>
  }

  /**
   * document_access_audit delete
   */
  export type document_access_auditDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_access_audit
     */
    select?: document_access_auditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_access_audit
     */
    omit?: document_access_auditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_access_auditInclude<ExtArgs> | null
    /**
     * Filter which document_access_audit to delete.
     */
    where: document_access_auditWhereUniqueInput
  }

  /**
   * document_access_audit deleteMany
   */
  export type document_access_auditDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which document_access_audits to delete
     */
    where?: document_access_auditWhereInput
    /**
     * Limit how many document_access_audits to delete.
     */
    limit?: number
  }

  /**
   * document_access_audit.user
   */
  export type document_access_audit$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * document_access_audit.document_record
   */
  export type document_access_audit$document_recordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_record
     */
    select?: document_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_record
     */
    omit?: document_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_recordInclude<ExtArgs> | null
    where?: document_recordWhereInput
  }

  /**
   * document_access_audit without action
   */
  export type document_access_auditDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_access_audit
     */
    select?: document_access_auditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_access_audit
     */
    omit?: document_access_auditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_access_auditInclude<ExtArgs> | null
  }


  /**
   * Model document_file
   */

  export type AggregateDocument_file = {
    _count: Document_fileCountAggregateOutputType | null
    _avg: Document_fileAvgAggregateOutputType | null
    _sum: Document_fileSumAggregateOutputType | null
    _min: Document_fileMinAggregateOutputType | null
    _max: Document_fileMaxAggregateOutputType | null
  }

  export type Document_fileAvgAggregateOutputType = {
    size_bytes: number | null
  }

  export type Document_fileSumAggregateOutputType = {
    size_bytes: bigint | null
  }

  export type Document_fileMinAggregateOutputType = {
    id: string | null
    document_id: string | null
    file_path: string | null
    file_side: string | null
    mime_type: string | null
    size_bytes: bigint | null
    created_at: Date | null
  }

  export type Document_fileMaxAggregateOutputType = {
    id: string | null
    document_id: string | null
    file_path: string | null
    file_side: string | null
    mime_type: string | null
    size_bytes: bigint | null
    created_at: Date | null
  }

  export type Document_fileCountAggregateOutputType = {
    id: number
    document_id: number
    file_path: number
    file_side: number
    mime_type: number
    size_bytes: number
    created_at: number
    _all: number
  }


  export type Document_fileAvgAggregateInputType = {
    size_bytes?: true
  }

  export type Document_fileSumAggregateInputType = {
    size_bytes?: true
  }

  export type Document_fileMinAggregateInputType = {
    id?: true
    document_id?: true
    file_path?: true
    file_side?: true
    mime_type?: true
    size_bytes?: true
    created_at?: true
  }

  export type Document_fileMaxAggregateInputType = {
    id?: true
    document_id?: true
    file_path?: true
    file_side?: true
    mime_type?: true
    size_bytes?: true
    created_at?: true
  }

  export type Document_fileCountAggregateInputType = {
    id?: true
    document_id?: true
    file_path?: true
    file_side?: true
    mime_type?: true
    size_bytes?: true
    created_at?: true
    _all?: true
  }

  export type Document_fileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which document_file to aggregate.
     */
    where?: document_fileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of document_files to fetch.
     */
    orderBy?: document_fileOrderByWithRelationInput | document_fileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: document_fileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` document_files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` document_files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned document_files
    **/
    _count?: true | Document_fileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Document_fileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Document_fileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Document_fileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Document_fileMaxAggregateInputType
  }

  export type GetDocument_fileAggregateType<T extends Document_fileAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument_file]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument_file[P]>
      : GetScalarType<T[P], AggregateDocument_file[P]>
  }




  export type document_fileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: document_fileWhereInput
    orderBy?: document_fileOrderByWithAggregationInput | document_fileOrderByWithAggregationInput[]
    by: Document_fileScalarFieldEnum[] | Document_fileScalarFieldEnum
    having?: document_fileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Document_fileCountAggregateInputType | true
    _avg?: Document_fileAvgAggregateInputType
    _sum?: Document_fileSumAggregateInputType
    _min?: Document_fileMinAggregateInputType
    _max?: Document_fileMaxAggregateInputType
  }

  export type Document_fileGroupByOutputType = {
    id: string
    document_id: string
    file_path: string
    file_side: string
    mime_type: string | null
    size_bytes: bigint | null
    created_at: Date
    _count: Document_fileCountAggregateOutputType | null
    _avg: Document_fileAvgAggregateOutputType | null
    _sum: Document_fileSumAggregateOutputType | null
    _min: Document_fileMinAggregateOutputType | null
    _max: Document_fileMaxAggregateOutputType | null
  }

  type GetDocument_fileGroupByPayload<T extends document_fileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Document_fileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Document_fileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Document_fileGroupByOutputType[P]>
            : GetScalarType<T[P], Document_fileGroupByOutputType[P]>
        }
      >
    >


  export type document_fileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_id?: boolean
    file_path?: boolean
    file_side?: boolean
    mime_type?: boolean
    size_bytes?: boolean
    created_at?: boolean
    document_record?: boolean | document_recordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document_file"]>

  export type document_fileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_id?: boolean
    file_path?: boolean
    file_side?: boolean
    mime_type?: boolean
    size_bytes?: boolean
    created_at?: boolean
    document_record?: boolean | document_recordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document_file"]>

  export type document_fileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_id?: boolean
    file_path?: boolean
    file_side?: boolean
    mime_type?: boolean
    size_bytes?: boolean
    created_at?: boolean
    document_record?: boolean | document_recordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document_file"]>

  export type document_fileSelectScalar = {
    id?: boolean
    document_id?: boolean
    file_path?: boolean
    file_side?: boolean
    mime_type?: boolean
    size_bytes?: boolean
    created_at?: boolean
  }

  export type document_fileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "document_id" | "file_path" | "file_side" | "mime_type" | "size_bytes" | "created_at", ExtArgs["result"]["document_file"]>
  export type document_fileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document_record?: boolean | document_recordDefaultArgs<ExtArgs>
  }
  export type document_fileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document_record?: boolean | document_recordDefaultArgs<ExtArgs>
  }
  export type document_fileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document_record?: boolean | document_recordDefaultArgs<ExtArgs>
  }

  export type $document_filePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "document_file"
    objects: {
      document_record: Prisma.$document_recordPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      document_id: string
      file_path: string
      file_side: string
      mime_type: string | null
      size_bytes: bigint | null
      created_at: Date
    }, ExtArgs["result"]["document_file"]>
    composites: {}
  }

  type document_fileGetPayload<S extends boolean | null | undefined | document_fileDefaultArgs> = $Result.GetResult<Prisma.$document_filePayload, S>

  type document_fileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<document_fileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Document_fileCountAggregateInputType | true
    }

  export interface document_fileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['document_file'], meta: { name: 'document_file' } }
    /**
     * Find zero or one Document_file that matches the filter.
     * @param {document_fileFindUniqueArgs} args - Arguments to find a Document_file
     * @example
     * // Get one Document_file
     * const document_file = await prisma.document_file.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends document_fileFindUniqueArgs>(args: SelectSubset<T, document_fileFindUniqueArgs<ExtArgs>>): Prisma__document_fileClient<$Result.GetResult<Prisma.$document_filePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document_file that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {document_fileFindUniqueOrThrowArgs} args - Arguments to find a Document_file
     * @example
     * // Get one Document_file
     * const document_file = await prisma.document_file.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends document_fileFindUniqueOrThrowArgs>(args: SelectSubset<T, document_fileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__document_fileClient<$Result.GetResult<Prisma.$document_filePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document_file that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_fileFindFirstArgs} args - Arguments to find a Document_file
     * @example
     * // Get one Document_file
     * const document_file = await prisma.document_file.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends document_fileFindFirstArgs>(args?: SelectSubset<T, document_fileFindFirstArgs<ExtArgs>>): Prisma__document_fileClient<$Result.GetResult<Prisma.$document_filePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document_file that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_fileFindFirstOrThrowArgs} args - Arguments to find a Document_file
     * @example
     * // Get one Document_file
     * const document_file = await prisma.document_file.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends document_fileFindFirstOrThrowArgs>(args?: SelectSubset<T, document_fileFindFirstOrThrowArgs<ExtArgs>>): Prisma__document_fileClient<$Result.GetResult<Prisma.$document_filePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Document_files that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_fileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Document_files
     * const document_files = await prisma.document_file.findMany()
     * 
     * // Get first 10 Document_files
     * const document_files = await prisma.document_file.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const document_fileWithIdOnly = await prisma.document_file.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends document_fileFindManyArgs>(args?: SelectSubset<T, document_fileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_filePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document_file.
     * @param {document_fileCreateArgs} args - Arguments to create a Document_file.
     * @example
     * // Create one Document_file
     * const Document_file = await prisma.document_file.create({
     *   data: {
     *     // ... data to create a Document_file
     *   }
     * })
     * 
     */
    create<T extends document_fileCreateArgs>(args: SelectSubset<T, document_fileCreateArgs<ExtArgs>>): Prisma__document_fileClient<$Result.GetResult<Prisma.$document_filePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Document_files.
     * @param {document_fileCreateManyArgs} args - Arguments to create many Document_files.
     * @example
     * // Create many Document_files
     * const document_file = await prisma.document_file.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends document_fileCreateManyArgs>(args?: SelectSubset<T, document_fileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Document_files and returns the data saved in the database.
     * @param {document_fileCreateManyAndReturnArgs} args - Arguments to create many Document_files.
     * @example
     * // Create many Document_files
     * const document_file = await prisma.document_file.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Document_files and only return the `id`
     * const document_fileWithIdOnly = await prisma.document_file.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends document_fileCreateManyAndReturnArgs>(args?: SelectSubset<T, document_fileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_filePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document_file.
     * @param {document_fileDeleteArgs} args - Arguments to delete one Document_file.
     * @example
     * // Delete one Document_file
     * const Document_file = await prisma.document_file.delete({
     *   where: {
     *     // ... filter to delete one Document_file
     *   }
     * })
     * 
     */
    delete<T extends document_fileDeleteArgs>(args: SelectSubset<T, document_fileDeleteArgs<ExtArgs>>): Prisma__document_fileClient<$Result.GetResult<Prisma.$document_filePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document_file.
     * @param {document_fileUpdateArgs} args - Arguments to update one Document_file.
     * @example
     * // Update one Document_file
     * const document_file = await prisma.document_file.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends document_fileUpdateArgs>(args: SelectSubset<T, document_fileUpdateArgs<ExtArgs>>): Prisma__document_fileClient<$Result.GetResult<Prisma.$document_filePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Document_files.
     * @param {document_fileDeleteManyArgs} args - Arguments to filter Document_files to delete.
     * @example
     * // Delete a few Document_files
     * const { count } = await prisma.document_file.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends document_fileDeleteManyArgs>(args?: SelectSubset<T, document_fileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Document_files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_fileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Document_files
     * const document_file = await prisma.document_file.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends document_fileUpdateManyArgs>(args: SelectSubset<T, document_fileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Document_files and returns the data updated in the database.
     * @param {document_fileUpdateManyAndReturnArgs} args - Arguments to update many Document_files.
     * @example
     * // Update many Document_files
     * const document_file = await prisma.document_file.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Document_files and only return the `id`
     * const document_fileWithIdOnly = await prisma.document_file.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends document_fileUpdateManyAndReturnArgs>(args: SelectSubset<T, document_fileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_filePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document_file.
     * @param {document_fileUpsertArgs} args - Arguments to update or create a Document_file.
     * @example
     * // Update or create a Document_file
     * const document_file = await prisma.document_file.upsert({
     *   create: {
     *     // ... data to create a Document_file
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document_file we want to update
     *   }
     * })
     */
    upsert<T extends document_fileUpsertArgs>(args: SelectSubset<T, document_fileUpsertArgs<ExtArgs>>): Prisma__document_fileClient<$Result.GetResult<Prisma.$document_filePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Document_files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_fileCountArgs} args - Arguments to filter Document_files to count.
     * @example
     * // Count the number of Document_files
     * const count = await prisma.document_file.count({
     *   where: {
     *     // ... the filter for the Document_files we want to count
     *   }
     * })
    **/
    count<T extends document_fileCountArgs>(
      args?: Subset<T, document_fileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Document_fileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document_file.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Document_fileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Document_fileAggregateArgs>(args: Subset<T, Document_fileAggregateArgs>): Prisma.PrismaPromise<GetDocument_fileAggregateType<T>>

    /**
     * Group by Document_file.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_fileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends document_fileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: document_fileGroupByArgs['orderBy'] }
        : { orderBy?: document_fileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, document_fileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocument_fileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the document_file model
   */
  readonly fields: document_fileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for document_file.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__document_fileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    document_record<T extends document_recordDefaultArgs<ExtArgs> = {}>(args?: Subset<T, document_recordDefaultArgs<ExtArgs>>): Prisma__document_recordClient<$Result.GetResult<Prisma.$document_recordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the document_file model
   */
  interface document_fileFieldRefs {
    readonly id: FieldRef<"document_file", 'String'>
    readonly document_id: FieldRef<"document_file", 'String'>
    readonly file_path: FieldRef<"document_file", 'String'>
    readonly file_side: FieldRef<"document_file", 'String'>
    readonly mime_type: FieldRef<"document_file", 'String'>
    readonly size_bytes: FieldRef<"document_file", 'BigInt'>
    readonly created_at: FieldRef<"document_file", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * document_file findUnique
   */
  export type document_fileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_file
     */
    select?: document_fileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_file
     */
    omit?: document_fileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_fileInclude<ExtArgs> | null
    /**
     * Filter, which document_file to fetch.
     */
    where: document_fileWhereUniqueInput
  }

  /**
   * document_file findUniqueOrThrow
   */
  export type document_fileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_file
     */
    select?: document_fileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_file
     */
    omit?: document_fileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_fileInclude<ExtArgs> | null
    /**
     * Filter, which document_file to fetch.
     */
    where: document_fileWhereUniqueInput
  }

  /**
   * document_file findFirst
   */
  export type document_fileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_file
     */
    select?: document_fileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_file
     */
    omit?: document_fileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_fileInclude<ExtArgs> | null
    /**
     * Filter, which document_file to fetch.
     */
    where?: document_fileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of document_files to fetch.
     */
    orderBy?: document_fileOrderByWithRelationInput | document_fileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for document_files.
     */
    cursor?: document_fileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` document_files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` document_files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of document_files.
     */
    distinct?: Document_fileScalarFieldEnum | Document_fileScalarFieldEnum[]
  }

  /**
   * document_file findFirstOrThrow
   */
  export type document_fileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_file
     */
    select?: document_fileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_file
     */
    omit?: document_fileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_fileInclude<ExtArgs> | null
    /**
     * Filter, which document_file to fetch.
     */
    where?: document_fileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of document_files to fetch.
     */
    orderBy?: document_fileOrderByWithRelationInput | document_fileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for document_files.
     */
    cursor?: document_fileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` document_files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` document_files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of document_files.
     */
    distinct?: Document_fileScalarFieldEnum | Document_fileScalarFieldEnum[]
  }

  /**
   * document_file findMany
   */
  export type document_fileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_file
     */
    select?: document_fileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_file
     */
    omit?: document_fileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_fileInclude<ExtArgs> | null
    /**
     * Filter, which document_files to fetch.
     */
    where?: document_fileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of document_files to fetch.
     */
    orderBy?: document_fileOrderByWithRelationInput | document_fileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing document_files.
     */
    cursor?: document_fileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` document_files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` document_files.
     */
    skip?: number
    distinct?: Document_fileScalarFieldEnum | Document_fileScalarFieldEnum[]
  }

  /**
   * document_file create
   */
  export type document_fileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_file
     */
    select?: document_fileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_file
     */
    omit?: document_fileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_fileInclude<ExtArgs> | null
    /**
     * The data needed to create a document_file.
     */
    data: XOR<document_fileCreateInput, document_fileUncheckedCreateInput>
  }

  /**
   * document_file createMany
   */
  export type document_fileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many document_files.
     */
    data: document_fileCreateManyInput | document_fileCreateManyInput[]
  }

  /**
   * document_file createManyAndReturn
   */
  export type document_fileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_file
     */
    select?: document_fileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the document_file
     */
    omit?: document_fileOmit<ExtArgs> | null
    /**
     * The data used to create many document_files.
     */
    data: document_fileCreateManyInput | document_fileCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_fileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * document_file update
   */
  export type document_fileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_file
     */
    select?: document_fileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_file
     */
    omit?: document_fileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_fileInclude<ExtArgs> | null
    /**
     * The data needed to update a document_file.
     */
    data: XOR<document_fileUpdateInput, document_fileUncheckedUpdateInput>
    /**
     * Choose, which document_file to update.
     */
    where: document_fileWhereUniqueInput
  }

  /**
   * document_file updateMany
   */
  export type document_fileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update document_files.
     */
    data: XOR<document_fileUpdateManyMutationInput, document_fileUncheckedUpdateManyInput>
    /**
     * Filter which document_files to update
     */
    where?: document_fileWhereInput
    /**
     * Limit how many document_files to update.
     */
    limit?: number
  }

  /**
   * document_file updateManyAndReturn
   */
  export type document_fileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_file
     */
    select?: document_fileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the document_file
     */
    omit?: document_fileOmit<ExtArgs> | null
    /**
     * The data used to update document_files.
     */
    data: XOR<document_fileUpdateManyMutationInput, document_fileUncheckedUpdateManyInput>
    /**
     * Filter which document_files to update
     */
    where?: document_fileWhereInput
    /**
     * Limit how many document_files to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_fileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * document_file upsert
   */
  export type document_fileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_file
     */
    select?: document_fileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_file
     */
    omit?: document_fileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_fileInclude<ExtArgs> | null
    /**
     * The filter to search for the document_file to update in case it exists.
     */
    where: document_fileWhereUniqueInput
    /**
     * In case the document_file found by the `where` argument doesn't exist, create a new document_file with this data.
     */
    create: XOR<document_fileCreateInput, document_fileUncheckedCreateInput>
    /**
     * In case the document_file was found with the provided `where` argument, update it with this data.
     */
    update: XOR<document_fileUpdateInput, document_fileUncheckedUpdateInput>
  }

  /**
   * document_file delete
   */
  export type document_fileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_file
     */
    select?: document_fileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_file
     */
    omit?: document_fileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_fileInclude<ExtArgs> | null
    /**
     * Filter which document_file to delete.
     */
    where: document_fileWhereUniqueInput
  }

  /**
   * document_file deleteMany
   */
  export type document_fileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which document_files to delete
     */
    where?: document_fileWhereInput
    /**
     * Limit how many document_files to delete.
     */
    limit?: number
  }

  /**
   * document_file without action
   */
  export type document_fileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_file
     */
    select?: document_fileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_file
     */
    omit?: document_fileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_fileInclude<ExtArgs> | null
  }


  /**
   * Model document_record
   */

  export type AggregateDocument_record = {
    _count: Document_recordCountAggregateOutputType | null
    _min: Document_recordMinAggregateOutputType | null
    _max: Document_recordMaxAggregateOutputType | null
  }

  export type Document_recordMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    document_type: string | null
    document_number_token: string | null
    document_number_last4: string | null
    document_number_hash: string | null
    masked_number: string | null
    name_on_document: string | null
    metadata: string | null
    verified_at: Date | null
    expires_at: Date | null
    created_at: Date | null
    updated_at: Date | null
    category: string | null
  }

  export type Document_recordMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    document_type: string | null
    document_number_token: string | null
    document_number_last4: string | null
    document_number_hash: string | null
    masked_number: string | null
    name_on_document: string | null
    metadata: string | null
    verified_at: Date | null
    expires_at: Date | null
    created_at: Date | null
    updated_at: Date | null
    category: string | null
  }

  export type Document_recordCountAggregateOutputType = {
    id: number
    user_id: number
    document_type: number
    document_number_token: number
    document_number_last4: number
    document_number_hash: number
    masked_number: number
    name_on_document: number
    metadata: number
    verified_at: number
    expires_at: number
    created_at: number
    updated_at: number
    category: number
    _all: number
  }


  export type Document_recordMinAggregateInputType = {
    id?: true
    user_id?: true
    document_type?: true
    document_number_token?: true
    document_number_last4?: true
    document_number_hash?: true
    masked_number?: true
    name_on_document?: true
    metadata?: true
    verified_at?: true
    expires_at?: true
    created_at?: true
    updated_at?: true
    category?: true
  }

  export type Document_recordMaxAggregateInputType = {
    id?: true
    user_id?: true
    document_type?: true
    document_number_token?: true
    document_number_last4?: true
    document_number_hash?: true
    masked_number?: true
    name_on_document?: true
    metadata?: true
    verified_at?: true
    expires_at?: true
    created_at?: true
    updated_at?: true
    category?: true
  }

  export type Document_recordCountAggregateInputType = {
    id?: true
    user_id?: true
    document_type?: true
    document_number_token?: true
    document_number_last4?: true
    document_number_hash?: true
    masked_number?: true
    name_on_document?: true
    metadata?: true
    verified_at?: true
    expires_at?: true
    created_at?: true
    updated_at?: true
    category?: true
    _all?: true
  }

  export type Document_recordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which document_record to aggregate.
     */
    where?: document_recordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of document_records to fetch.
     */
    orderBy?: document_recordOrderByWithRelationInput | document_recordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: document_recordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` document_records from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` document_records.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned document_records
    **/
    _count?: true | Document_recordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Document_recordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Document_recordMaxAggregateInputType
  }

  export type GetDocument_recordAggregateType<T extends Document_recordAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument_record]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument_record[P]>
      : GetScalarType<T[P], AggregateDocument_record[P]>
  }




  export type document_recordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: document_recordWhereInput
    orderBy?: document_recordOrderByWithAggregationInput | document_recordOrderByWithAggregationInput[]
    by: Document_recordScalarFieldEnum[] | Document_recordScalarFieldEnum
    having?: document_recordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Document_recordCountAggregateInputType | true
    _min?: Document_recordMinAggregateInputType
    _max?: Document_recordMaxAggregateInputType
  }

  export type Document_recordGroupByOutputType = {
    id: string
    user_id: string
    document_type: string
    document_number_token: string
    document_number_last4: string
    document_number_hash: string
    masked_number: string
    name_on_document: string | null
    metadata: string | null
    verified_at: Date | null
    expires_at: Date | null
    created_at: Date
    updated_at: Date
    category: string | null
    _count: Document_recordCountAggregateOutputType | null
    _min: Document_recordMinAggregateOutputType | null
    _max: Document_recordMaxAggregateOutputType | null
  }

  type GetDocument_recordGroupByPayload<T extends document_recordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Document_recordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Document_recordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Document_recordGroupByOutputType[P]>
            : GetScalarType<T[P], Document_recordGroupByOutputType[P]>
        }
      >
    >


  export type document_recordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    document_type?: boolean
    document_number_token?: boolean
    document_number_last4?: boolean
    document_number_hash?: boolean
    masked_number?: boolean
    name_on_document?: boolean
    metadata?: boolean
    verified_at?: boolean
    expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    category?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    document_access_audit?: boolean | document_record$document_access_auditArgs<ExtArgs>
    document_file?: boolean | document_record$document_fileArgs<ExtArgs>
    _count?: boolean | Document_recordCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document_record"]>

  export type document_recordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    document_type?: boolean
    document_number_token?: boolean
    document_number_last4?: boolean
    document_number_hash?: boolean
    masked_number?: boolean
    name_on_document?: boolean
    metadata?: boolean
    verified_at?: boolean
    expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    category?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document_record"]>

  export type document_recordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    document_type?: boolean
    document_number_token?: boolean
    document_number_last4?: boolean
    document_number_hash?: boolean
    masked_number?: boolean
    name_on_document?: boolean
    metadata?: boolean
    verified_at?: boolean
    expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    category?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document_record"]>

  export type document_recordSelectScalar = {
    id?: boolean
    user_id?: boolean
    document_type?: boolean
    document_number_token?: boolean
    document_number_last4?: boolean
    document_number_hash?: boolean
    masked_number?: boolean
    name_on_document?: boolean
    metadata?: boolean
    verified_at?: boolean
    expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    category?: boolean
  }

  export type document_recordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "document_type" | "document_number_token" | "document_number_last4" | "document_number_hash" | "masked_number" | "name_on_document" | "metadata" | "verified_at" | "expires_at" | "created_at" | "updated_at" | "category", ExtArgs["result"]["document_record"]>
  export type document_recordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    document_access_audit?: boolean | document_record$document_access_auditArgs<ExtArgs>
    document_file?: boolean | document_record$document_fileArgs<ExtArgs>
    _count?: boolean | Document_recordCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type document_recordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type document_recordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $document_recordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "document_record"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      document_access_audit: Prisma.$document_access_auditPayload<ExtArgs>[]
      document_file: Prisma.$document_filePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      document_type: string
      document_number_token: string
      document_number_last4: string
      document_number_hash: string
      masked_number: string
      name_on_document: string | null
      metadata: string | null
      verified_at: Date | null
      expires_at: Date | null
      created_at: Date
      updated_at: Date
      category: string | null
    }, ExtArgs["result"]["document_record"]>
    composites: {}
  }

  type document_recordGetPayload<S extends boolean | null | undefined | document_recordDefaultArgs> = $Result.GetResult<Prisma.$document_recordPayload, S>

  type document_recordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<document_recordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Document_recordCountAggregateInputType | true
    }

  export interface document_recordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['document_record'], meta: { name: 'document_record' } }
    /**
     * Find zero or one Document_record that matches the filter.
     * @param {document_recordFindUniqueArgs} args - Arguments to find a Document_record
     * @example
     * // Get one Document_record
     * const document_record = await prisma.document_record.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends document_recordFindUniqueArgs>(args: SelectSubset<T, document_recordFindUniqueArgs<ExtArgs>>): Prisma__document_recordClient<$Result.GetResult<Prisma.$document_recordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document_record that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {document_recordFindUniqueOrThrowArgs} args - Arguments to find a Document_record
     * @example
     * // Get one Document_record
     * const document_record = await prisma.document_record.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends document_recordFindUniqueOrThrowArgs>(args: SelectSubset<T, document_recordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__document_recordClient<$Result.GetResult<Prisma.$document_recordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document_record that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_recordFindFirstArgs} args - Arguments to find a Document_record
     * @example
     * // Get one Document_record
     * const document_record = await prisma.document_record.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends document_recordFindFirstArgs>(args?: SelectSubset<T, document_recordFindFirstArgs<ExtArgs>>): Prisma__document_recordClient<$Result.GetResult<Prisma.$document_recordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document_record that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_recordFindFirstOrThrowArgs} args - Arguments to find a Document_record
     * @example
     * // Get one Document_record
     * const document_record = await prisma.document_record.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends document_recordFindFirstOrThrowArgs>(args?: SelectSubset<T, document_recordFindFirstOrThrowArgs<ExtArgs>>): Prisma__document_recordClient<$Result.GetResult<Prisma.$document_recordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Document_records that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_recordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Document_records
     * const document_records = await prisma.document_record.findMany()
     * 
     * // Get first 10 Document_records
     * const document_records = await prisma.document_record.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const document_recordWithIdOnly = await prisma.document_record.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends document_recordFindManyArgs>(args?: SelectSubset<T, document_recordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_recordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document_record.
     * @param {document_recordCreateArgs} args - Arguments to create a Document_record.
     * @example
     * // Create one Document_record
     * const Document_record = await prisma.document_record.create({
     *   data: {
     *     // ... data to create a Document_record
     *   }
     * })
     * 
     */
    create<T extends document_recordCreateArgs>(args: SelectSubset<T, document_recordCreateArgs<ExtArgs>>): Prisma__document_recordClient<$Result.GetResult<Prisma.$document_recordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Document_records.
     * @param {document_recordCreateManyArgs} args - Arguments to create many Document_records.
     * @example
     * // Create many Document_records
     * const document_record = await prisma.document_record.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends document_recordCreateManyArgs>(args?: SelectSubset<T, document_recordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Document_records and returns the data saved in the database.
     * @param {document_recordCreateManyAndReturnArgs} args - Arguments to create many Document_records.
     * @example
     * // Create many Document_records
     * const document_record = await prisma.document_record.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Document_records and only return the `id`
     * const document_recordWithIdOnly = await prisma.document_record.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends document_recordCreateManyAndReturnArgs>(args?: SelectSubset<T, document_recordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_recordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document_record.
     * @param {document_recordDeleteArgs} args - Arguments to delete one Document_record.
     * @example
     * // Delete one Document_record
     * const Document_record = await prisma.document_record.delete({
     *   where: {
     *     // ... filter to delete one Document_record
     *   }
     * })
     * 
     */
    delete<T extends document_recordDeleteArgs>(args: SelectSubset<T, document_recordDeleteArgs<ExtArgs>>): Prisma__document_recordClient<$Result.GetResult<Prisma.$document_recordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document_record.
     * @param {document_recordUpdateArgs} args - Arguments to update one Document_record.
     * @example
     * // Update one Document_record
     * const document_record = await prisma.document_record.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends document_recordUpdateArgs>(args: SelectSubset<T, document_recordUpdateArgs<ExtArgs>>): Prisma__document_recordClient<$Result.GetResult<Prisma.$document_recordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Document_records.
     * @param {document_recordDeleteManyArgs} args - Arguments to filter Document_records to delete.
     * @example
     * // Delete a few Document_records
     * const { count } = await prisma.document_record.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends document_recordDeleteManyArgs>(args?: SelectSubset<T, document_recordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Document_records.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_recordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Document_records
     * const document_record = await prisma.document_record.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends document_recordUpdateManyArgs>(args: SelectSubset<T, document_recordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Document_records and returns the data updated in the database.
     * @param {document_recordUpdateManyAndReturnArgs} args - Arguments to update many Document_records.
     * @example
     * // Update many Document_records
     * const document_record = await prisma.document_record.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Document_records and only return the `id`
     * const document_recordWithIdOnly = await prisma.document_record.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends document_recordUpdateManyAndReturnArgs>(args: SelectSubset<T, document_recordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_recordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document_record.
     * @param {document_recordUpsertArgs} args - Arguments to update or create a Document_record.
     * @example
     * // Update or create a Document_record
     * const document_record = await prisma.document_record.upsert({
     *   create: {
     *     // ... data to create a Document_record
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document_record we want to update
     *   }
     * })
     */
    upsert<T extends document_recordUpsertArgs>(args: SelectSubset<T, document_recordUpsertArgs<ExtArgs>>): Prisma__document_recordClient<$Result.GetResult<Prisma.$document_recordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Document_records.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_recordCountArgs} args - Arguments to filter Document_records to count.
     * @example
     * // Count the number of Document_records
     * const count = await prisma.document_record.count({
     *   where: {
     *     // ... the filter for the Document_records we want to count
     *   }
     * })
    **/
    count<T extends document_recordCountArgs>(
      args?: Subset<T, document_recordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Document_recordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document_record.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Document_recordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Document_recordAggregateArgs>(args: Subset<T, Document_recordAggregateArgs>): Prisma.PrismaPromise<GetDocument_recordAggregateType<T>>

    /**
     * Group by Document_record.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_recordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends document_recordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: document_recordGroupByArgs['orderBy'] }
        : { orderBy?: document_recordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, document_recordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocument_recordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the document_record model
   */
  readonly fields: document_recordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for document_record.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__document_recordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    document_access_audit<T extends document_record$document_access_auditArgs<ExtArgs> = {}>(args?: Subset<T, document_record$document_access_auditArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_access_auditPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    document_file<T extends document_record$document_fileArgs<ExtArgs> = {}>(args?: Subset<T, document_record$document_fileArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_filePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the document_record model
   */
  interface document_recordFieldRefs {
    readonly id: FieldRef<"document_record", 'String'>
    readonly user_id: FieldRef<"document_record", 'String'>
    readonly document_type: FieldRef<"document_record", 'String'>
    readonly document_number_token: FieldRef<"document_record", 'String'>
    readonly document_number_last4: FieldRef<"document_record", 'String'>
    readonly document_number_hash: FieldRef<"document_record", 'String'>
    readonly masked_number: FieldRef<"document_record", 'String'>
    readonly name_on_document: FieldRef<"document_record", 'String'>
    readonly metadata: FieldRef<"document_record", 'String'>
    readonly verified_at: FieldRef<"document_record", 'DateTime'>
    readonly expires_at: FieldRef<"document_record", 'DateTime'>
    readonly created_at: FieldRef<"document_record", 'DateTime'>
    readonly updated_at: FieldRef<"document_record", 'DateTime'>
    readonly category: FieldRef<"document_record", 'String'>
  }
    

  // Custom InputTypes
  /**
   * document_record findUnique
   */
  export type document_recordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_record
     */
    select?: document_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_record
     */
    omit?: document_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_recordInclude<ExtArgs> | null
    /**
     * Filter, which document_record to fetch.
     */
    where: document_recordWhereUniqueInput
  }

  /**
   * document_record findUniqueOrThrow
   */
  export type document_recordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_record
     */
    select?: document_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_record
     */
    omit?: document_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_recordInclude<ExtArgs> | null
    /**
     * Filter, which document_record to fetch.
     */
    where: document_recordWhereUniqueInput
  }

  /**
   * document_record findFirst
   */
  export type document_recordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_record
     */
    select?: document_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_record
     */
    omit?: document_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_recordInclude<ExtArgs> | null
    /**
     * Filter, which document_record to fetch.
     */
    where?: document_recordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of document_records to fetch.
     */
    orderBy?: document_recordOrderByWithRelationInput | document_recordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for document_records.
     */
    cursor?: document_recordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` document_records from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` document_records.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of document_records.
     */
    distinct?: Document_recordScalarFieldEnum | Document_recordScalarFieldEnum[]
  }

  /**
   * document_record findFirstOrThrow
   */
  export type document_recordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_record
     */
    select?: document_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_record
     */
    omit?: document_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_recordInclude<ExtArgs> | null
    /**
     * Filter, which document_record to fetch.
     */
    where?: document_recordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of document_records to fetch.
     */
    orderBy?: document_recordOrderByWithRelationInput | document_recordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for document_records.
     */
    cursor?: document_recordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` document_records from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` document_records.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of document_records.
     */
    distinct?: Document_recordScalarFieldEnum | Document_recordScalarFieldEnum[]
  }

  /**
   * document_record findMany
   */
  export type document_recordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_record
     */
    select?: document_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_record
     */
    omit?: document_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_recordInclude<ExtArgs> | null
    /**
     * Filter, which document_records to fetch.
     */
    where?: document_recordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of document_records to fetch.
     */
    orderBy?: document_recordOrderByWithRelationInput | document_recordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing document_records.
     */
    cursor?: document_recordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` document_records from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` document_records.
     */
    skip?: number
    distinct?: Document_recordScalarFieldEnum | Document_recordScalarFieldEnum[]
  }

  /**
   * document_record create
   */
  export type document_recordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_record
     */
    select?: document_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_record
     */
    omit?: document_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_recordInclude<ExtArgs> | null
    /**
     * The data needed to create a document_record.
     */
    data: XOR<document_recordCreateInput, document_recordUncheckedCreateInput>
  }

  /**
   * document_record createMany
   */
  export type document_recordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many document_records.
     */
    data: document_recordCreateManyInput | document_recordCreateManyInput[]
  }

  /**
   * document_record createManyAndReturn
   */
  export type document_recordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_record
     */
    select?: document_recordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the document_record
     */
    omit?: document_recordOmit<ExtArgs> | null
    /**
     * The data used to create many document_records.
     */
    data: document_recordCreateManyInput | document_recordCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_recordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * document_record update
   */
  export type document_recordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_record
     */
    select?: document_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_record
     */
    omit?: document_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_recordInclude<ExtArgs> | null
    /**
     * The data needed to update a document_record.
     */
    data: XOR<document_recordUpdateInput, document_recordUncheckedUpdateInput>
    /**
     * Choose, which document_record to update.
     */
    where: document_recordWhereUniqueInput
  }

  /**
   * document_record updateMany
   */
  export type document_recordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update document_records.
     */
    data: XOR<document_recordUpdateManyMutationInput, document_recordUncheckedUpdateManyInput>
    /**
     * Filter which document_records to update
     */
    where?: document_recordWhereInput
    /**
     * Limit how many document_records to update.
     */
    limit?: number
  }

  /**
   * document_record updateManyAndReturn
   */
  export type document_recordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_record
     */
    select?: document_recordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the document_record
     */
    omit?: document_recordOmit<ExtArgs> | null
    /**
     * The data used to update document_records.
     */
    data: XOR<document_recordUpdateManyMutationInput, document_recordUncheckedUpdateManyInput>
    /**
     * Filter which document_records to update
     */
    where?: document_recordWhereInput
    /**
     * Limit how many document_records to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_recordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * document_record upsert
   */
  export type document_recordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_record
     */
    select?: document_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_record
     */
    omit?: document_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_recordInclude<ExtArgs> | null
    /**
     * The filter to search for the document_record to update in case it exists.
     */
    where: document_recordWhereUniqueInput
    /**
     * In case the document_record found by the `where` argument doesn't exist, create a new document_record with this data.
     */
    create: XOR<document_recordCreateInput, document_recordUncheckedCreateInput>
    /**
     * In case the document_record was found with the provided `where` argument, update it with this data.
     */
    update: XOR<document_recordUpdateInput, document_recordUncheckedUpdateInput>
  }

  /**
   * document_record delete
   */
  export type document_recordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_record
     */
    select?: document_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_record
     */
    omit?: document_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_recordInclude<ExtArgs> | null
    /**
     * Filter which document_record to delete.
     */
    where: document_recordWhereUniqueInput
  }

  /**
   * document_record deleteMany
   */
  export type document_recordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which document_records to delete
     */
    where?: document_recordWhereInput
    /**
     * Limit how many document_records to delete.
     */
    limit?: number
  }

  /**
   * document_record.document_access_audit
   */
  export type document_record$document_access_auditArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_access_audit
     */
    select?: document_access_auditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_access_audit
     */
    omit?: document_access_auditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_access_auditInclude<ExtArgs> | null
    where?: document_access_auditWhereInput
    orderBy?: document_access_auditOrderByWithRelationInput | document_access_auditOrderByWithRelationInput[]
    cursor?: document_access_auditWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Document_access_auditScalarFieldEnum | Document_access_auditScalarFieldEnum[]
  }

  /**
   * document_record.document_file
   */
  export type document_record$document_fileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_file
     */
    select?: document_fileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_file
     */
    omit?: document_fileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_fileInclude<ExtArgs> | null
    where?: document_fileWhereInput
    orderBy?: document_fileOrderByWithRelationInput | document_fileOrderByWithRelationInput[]
    cursor?: document_fileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Document_fileScalarFieldEnum | Document_fileScalarFieldEnum[]
  }

  /**
   * document_record without action
   */
  export type document_recordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_record
     */
    select?: document_recordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_record
     */
    omit?: document_recordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_recordInclude<ExtArgs> | null
  }


  /**
   * Model dashboard_favorite
   */

  export type AggregateDashboard_favorite = {
    _count: Dashboard_favoriteCountAggregateOutputType | null
    _avg: Dashboard_favoriteAvgAggregateOutputType | null
    _sum: Dashboard_favoriteSumAggregateOutputType | null
    _min: Dashboard_favoriteMinAggregateOutputType | null
    _max: Dashboard_favoriteMaxAggregateOutputType | null
  }

  export type Dashboard_favoriteAvgAggregateOutputType = {
    id: number | null
  }

  export type Dashboard_favoriteSumAggregateOutputType = {
    id: bigint | null
  }

  export type Dashboard_favoriteMinAggregateOutputType = {
    id: bigint | null
    user_id: string | null
    feature_key: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Dashboard_favoriteMaxAggregateOutputType = {
    id: bigint | null
    user_id: string | null
    feature_key: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Dashboard_favoriteCountAggregateOutputType = {
    id: number
    user_id: number
    feature_key: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Dashboard_favoriteAvgAggregateInputType = {
    id?: true
  }

  export type Dashboard_favoriteSumAggregateInputType = {
    id?: true
  }

  export type Dashboard_favoriteMinAggregateInputType = {
    id?: true
    user_id?: true
    feature_key?: true
    created_at?: true
    updated_at?: true
  }

  export type Dashboard_favoriteMaxAggregateInputType = {
    id?: true
    user_id?: true
    feature_key?: true
    created_at?: true
    updated_at?: true
  }

  export type Dashboard_favoriteCountAggregateInputType = {
    id?: true
    user_id?: true
    feature_key?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Dashboard_favoriteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which dashboard_favorite to aggregate.
     */
    where?: dashboard_favoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dashboard_favorites to fetch.
     */
    orderBy?: dashboard_favoriteOrderByWithRelationInput | dashboard_favoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: dashboard_favoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dashboard_favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dashboard_favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned dashboard_favorites
    **/
    _count?: true | Dashboard_favoriteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Dashboard_favoriteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Dashboard_favoriteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Dashboard_favoriteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Dashboard_favoriteMaxAggregateInputType
  }

  export type GetDashboard_favoriteAggregateType<T extends Dashboard_favoriteAggregateArgs> = {
        [P in keyof T & keyof AggregateDashboard_favorite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDashboard_favorite[P]>
      : GetScalarType<T[P], AggregateDashboard_favorite[P]>
  }




  export type dashboard_favoriteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: dashboard_favoriteWhereInput
    orderBy?: dashboard_favoriteOrderByWithAggregationInput | dashboard_favoriteOrderByWithAggregationInput[]
    by: Dashboard_favoriteScalarFieldEnum[] | Dashboard_favoriteScalarFieldEnum
    having?: dashboard_favoriteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Dashboard_favoriteCountAggregateInputType | true
    _avg?: Dashboard_favoriteAvgAggregateInputType
    _sum?: Dashboard_favoriteSumAggregateInputType
    _min?: Dashboard_favoriteMinAggregateInputType
    _max?: Dashboard_favoriteMaxAggregateInputType
  }

  export type Dashboard_favoriteGroupByOutputType = {
    id: bigint
    user_id: string
    feature_key: string
    created_at: Date
    updated_at: Date
    _count: Dashboard_favoriteCountAggregateOutputType | null
    _avg: Dashboard_favoriteAvgAggregateOutputType | null
    _sum: Dashboard_favoriteSumAggregateOutputType | null
    _min: Dashboard_favoriteMinAggregateOutputType | null
    _max: Dashboard_favoriteMaxAggregateOutputType | null
  }

  type GetDashboard_favoriteGroupByPayload<T extends dashboard_favoriteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Dashboard_favoriteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Dashboard_favoriteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Dashboard_favoriteGroupByOutputType[P]>
            : GetScalarType<T[P], Dashboard_favoriteGroupByOutputType[P]>
        }
      >
    >


  export type dashboard_favoriteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    feature_key?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dashboard_favorite"]>

  export type dashboard_favoriteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    feature_key?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dashboard_favorite"]>

  export type dashboard_favoriteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    feature_key?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dashboard_favorite"]>

  export type dashboard_favoriteSelectScalar = {
    id?: boolean
    user_id?: boolean
    feature_key?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type dashboard_favoriteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "feature_key" | "created_at" | "updated_at", ExtArgs["result"]["dashboard_favorite"]>
  export type dashboard_favoriteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type dashboard_favoriteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type dashboard_favoriteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $dashboard_favoritePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "dashboard_favorite"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      user_id: string
      feature_key: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["dashboard_favorite"]>
    composites: {}
  }

  type dashboard_favoriteGetPayload<S extends boolean | null | undefined | dashboard_favoriteDefaultArgs> = $Result.GetResult<Prisma.$dashboard_favoritePayload, S>

  type dashboard_favoriteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<dashboard_favoriteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Dashboard_favoriteCountAggregateInputType | true
    }

  export interface dashboard_favoriteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['dashboard_favorite'], meta: { name: 'dashboard_favorite' } }
    /**
     * Find zero or one Dashboard_favorite that matches the filter.
     * @param {dashboard_favoriteFindUniqueArgs} args - Arguments to find a Dashboard_favorite
     * @example
     * // Get one Dashboard_favorite
     * const dashboard_favorite = await prisma.dashboard_favorite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends dashboard_favoriteFindUniqueArgs>(args: SelectSubset<T, dashboard_favoriteFindUniqueArgs<ExtArgs>>): Prisma__dashboard_favoriteClient<$Result.GetResult<Prisma.$dashboard_favoritePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Dashboard_favorite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {dashboard_favoriteFindUniqueOrThrowArgs} args - Arguments to find a Dashboard_favorite
     * @example
     * // Get one Dashboard_favorite
     * const dashboard_favorite = await prisma.dashboard_favorite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends dashboard_favoriteFindUniqueOrThrowArgs>(args: SelectSubset<T, dashboard_favoriteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__dashboard_favoriteClient<$Result.GetResult<Prisma.$dashboard_favoritePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dashboard_favorite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dashboard_favoriteFindFirstArgs} args - Arguments to find a Dashboard_favorite
     * @example
     * // Get one Dashboard_favorite
     * const dashboard_favorite = await prisma.dashboard_favorite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends dashboard_favoriteFindFirstArgs>(args?: SelectSubset<T, dashboard_favoriteFindFirstArgs<ExtArgs>>): Prisma__dashboard_favoriteClient<$Result.GetResult<Prisma.$dashboard_favoritePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dashboard_favorite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dashboard_favoriteFindFirstOrThrowArgs} args - Arguments to find a Dashboard_favorite
     * @example
     * // Get one Dashboard_favorite
     * const dashboard_favorite = await prisma.dashboard_favorite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends dashboard_favoriteFindFirstOrThrowArgs>(args?: SelectSubset<T, dashboard_favoriteFindFirstOrThrowArgs<ExtArgs>>): Prisma__dashboard_favoriteClient<$Result.GetResult<Prisma.$dashboard_favoritePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Dashboard_favorites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dashboard_favoriteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dashboard_favorites
     * const dashboard_favorites = await prisma.dashboard_favorite.findMany()
     * 
     * // Get first 10 Dashboard_favorites
     * const dashboard_favorites = await prisma.dashboard_favorite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dashboard_favoriteWithIdOnly = await prisma.dashboard_favorite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends dashboard_favoriteFindManyArgs>(args?: SelectSubset<T, dashboard_favoriteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dashboard_favoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Dashboard_favorite.
     * @param {dashboard_favoriteCreateArgs} args - Arguments to create a Dashboard_favorite.
     * @example
     * // Create one Dashboard_favorite
     * const Dashboard_favorite = await prisma.dashboard_favorite.create({
     *   data: {
     *     // ... data to create a Dashboard_favorite
     *   }
     * })
     * 
     */
    create<T extends dashboard_favoriteCreateArgs>(args: SelectSubset<T, dashboard_favoriteCreateArgs<ExtArgs>>): Prisma__dashboard_favoriteClient<$Result.GetResult<Prisma.$dashboard_favoritePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Dashboard_favorites.
     * @param {dashboard_favoriteCreateManyArgs} args - Arguments to create many Dashboard_favorites.
     * @example
     * // Create many Dashboard_favorites
     * const dashboard_favorite = await prisma.dashboard_favorite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends dashboard_favoriteCreateManyArgs>(args?: SelectSubset<T, dashboard_favoriteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Dashboard_favorites and returns the data saved in the database.
     * @param {dashboard_favoriteCreateManyAndReturnArgs} args - Arguments to create many Dashboard_favorites.
     * @example
     * // Create many Dashboard_favorites
     * const dashboard_favorite = await prisma.dashboard_favorite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Dashboard_favorites and only return the `id`
     * const dashboard_favoriteWithIdOnly = await prisma.dashboard_favorite.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends dashboard_favoriteCreateManyAndReturnArgs>(args?: SelectSubset<T, dashboard_favoriteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dashboard_favoritePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Dashboard_favorite.
     * @param {dashboard_favoriteDeleteArgs} args - Arguments to delete one Dashboard_favorite.
     * @example
     * // Delete one Dashboard_favorite
     * const Dashboard_favorite = await prisma.dashboard_favorite.delete({
     *   where: {
     *     // ... filter to delete one Dashboard_favorite
     *   }
     * })
     * 
     */
    delete<T extends dashboard_favoriteDeleteArgs>(args: SelectSubset<T, dashboard_favoriteDeleteArgs<ExtArgs>>): Prisma__dashboard_favoriteClient<$Result.GetResult<Prisma.$dashboard_favoritePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Dashboard_favorite.
     * @param {dashboard_favoriteUpdateArgs} args - Arguments to update one Dashboard_favorite.
     * @example
     * // Update one Dashboard_favorite
     * const dashboard_favorite = await prisma.dashboard_favorite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends dashboard_favoriteUpdateArgs>(args: SelectSubset<T, dashboard_favoriteUpdateArgs<ExtArgs>>): Prisma__dashboard_favoriteClient<$Result.GetResult<Prisma.$dashboard_favoritePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Dashboard_favorites.
     * @param {dashboard_favoriteDeleteManyArgs} args - Arguments to filter Dashboard_favorites to delete.
     * @example
     * // Delete a few Dashboard_favorites
     * const { count } = await prisma.dashboard_favorite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends dashboard_favoriteDeleteManyArgs>(args?: SelectSubset<T, dashboard_favoriteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dashboard_favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dashboard_favoriteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dashboard_favorites
     * const dashboard_favorite = await prisma.dashboard_favorite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends dashboard_favoriteUpdateManyArgs>(args: SelectSubset<T, dashboard_favoriteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dashboard_favorites and returns the data updated in the database.
     * @param {dashboard_favoriteUpdateManyAndReturnArgs} args - Arguments to update many Dashboard_favorites.
     * @example
     * // Update many Dashboard_favorites
     * const dashboard_favorite = await prisma.dashboard_favorite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Dashboard_favorites and only return the `id`
     * const dashboard_favoriteWithIdOnly = await prisma.dashboard_favorite.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends dashboard_favoriteUpdateManyAndReturnArgs>(args: SelectSubset<T, dashboard_favoriteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dashboard_favoritePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Dashboard_favorite.
     * @param {dashboard_favoriteUpsertArgs} args - Arguments to update or create a Dashboard_favorite.
     * @example
     * // Update or create a Dashboard_favorite
     * const dashboard_favorite = await prisma.dashboard_favorite.upsert({
     *   create: {
     *     // ... data to create a Dashboard_favorite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dashboard_favorite we want to update
     *   }
     * })
     */
    upsert<T extends dashboard_favoriteUpsertArgs>(args: SelectSubset<T, dashboard_favoriteUpsertArgs<ExtArgs>>): Prisma__dashboard_favoriteClient<$Result.GetResult<Prisma.$dashboard_favoritePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Dashboard_favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dashboard_favoriteCountArgs} args - Arguments to filter Dashboard_favorites to count.
     * @example
     * // Count the number of Dashboard_favorites
     * const count = await prisma.dashboard_favorite.count({
     *   where: {
     *     // ... the filter for the Dashboard_favorites we want to count
     *   }
     * })
    **/
    count<T extends dashboard_favoriteCountArgs>(
      args?: Subset<T, dashboard_favoriteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Dashboard_favoriteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dashboard_favorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Dashboard_favoriteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Dashboard_favoriteAggregateArgs>(args: Subset<T, Dashboard_favoriteAggregateArgs>): Prisma.PrismaPromise<GetDashboard_favoriteAggregateType<T>>

    /**
     * Group by Dashboard_favorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dashboard_favoriteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends dashboard_favoriteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: dashboard_favoriteGroupByArgs['orderBy'] }
        : { orderBy?: dashboard_favoriteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, dashboard_favoriteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDashboard_favoriteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the dashboard_favorite model
   */
  readonly fields: dashboard_favoriteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for dashboard_favorite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__dashboard_favoriteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the dashboard_favorite model
   */
  interface dashboard_favoriteFieldRefs {
    readonly id: FieldRef<"dashboard_favorite", 'BigInt'>
    readonly user_id: FieldRef<"dashboard_favorite", 'String'>
    readonly feature_key: FieldRef<"dashboard_favorite", 'String'>
    readonly created_at: FieldRef<"dashboard_favorite", 'DateTime'>
    readonly updated_at: FieldRef<"dashboard_favorite", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * dashboard_favorite findUnique
   */
  export type dashboard_favoriteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboard_favorite
     */
    select?: dashboard_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dashboard_favorite
     */
    omit?: dashboard_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dashboard_favoriteInclude<ExtArgs> | null
    /**
     * Filter, which dashboard_favorite to fetch.
     */
    where: dashboard_favoriteWhereUniqueInput
  }

  /**
   * dashboard_favorite findUniqueOrThrow
   */
  export type dashboard_favoriteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboard_favorite
     */
    select?: dashboard_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dashboard_favorite
     */
    omit?: dashboard_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dashboard_favoriteInclude<ExtArgs> | null
    /**
     * Filter, which dashboard_favorite to fetch.
     */
    where: dashboard_favoriteWhereUniqueInput
  }

  /**
   * dashboard_favorite findFirst
   */
  export type dashboard_favoriteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboard_favorite
     */
    select?: dashboard_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dashboard_favorite
     */
    omit?: dashboard_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dashboard_favoriteInclude<ExtArgs> | null
    /**
     * Filter, which dashboard_favorite to fetch.
     */
    where?: dashboard_favoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dashboard_favorites to fetch.
     */
    orderBy?: dashboard_favoriteOrderByWithRelationInput | dashboard_favoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for dashboard_favorites.
     */
    cursor?: dashboard_favoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dashboard_favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dashboard_favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of dashboard_favorites.
     */
    distinct?: Dashboard_favoriteScalarFieldEnum | Dashboard_favoriteScalarFieldEnum[]
  }

  /**
   * dashboard_favorite findFirstOrThrow
   */
  export type dashboard_favoriteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboard_favorite
     */
    select?: dashboard_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dashboard_favorite
     */
    omit?: dashboard_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dashboard_favoriteInclude<ExtArgs> | null
    /**
     * Filter, which dashboard_favorite to fetch.
     */
    where?: dashboard_favoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dashboard_favorites to fetch.
     */
    orderBy?: dashboard_favoriteOrderByWithRelationInput | dashboard_favoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for dashboard_favorites.
     */
    cursor?: dashboard_favoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dashboard_favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dashboard_favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of dashboard_favorites.
     */
    distinct?: Dashboard_favoriteScalarFieldEnum | Dashboard_favoriteScalarFieldEnum[]
  }

  /**
   * dashboard_favorite findMany
   */
  export type dashboard_favoriteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboard_favorite
     */
    select?: dashboard_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dashboard_favorite
     */
    omit?: dashboard_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dashboard_favoriteInclude<ExtArgs> | null
    /**
     * Filter, which dashboard_favorites to fetch.
     */
    where?: dashboard_favoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dashboard_favorites to fetch.
     */
    orderBy?: dashboard_favoriteOrderByWithRelationInput | dashboard_favoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing dashboard_favorites.
     */
    cursor?: dashboard_favoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dashboard_favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dashboard_favorites.
     */
    skip?: number
    distinct?: Dashboard_favoriteScalarFieldEnum | Dashboard_favoriteScalarFieldEnum[]
  }

  /**
   * dashboard_favorite create
   */
  export type dashboard_favoriteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboard_favorite
     */
    select?: dashboard_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dashboard_favorite
     */
    omit?: dashboard_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dashboard_favoriteInclude<ExtArgs> | null
    /**
     * The data needed to create a dashboard_favorite.
     */
    data: XOR<dashboard_favoriteCreateInput, dashboard_favoriteUncheckedCreateInput>
  }

  /**
   * dashboard_favorite createMany
   */
  export type dashboard_favoriteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many dashboard_favorites.
     */
    data: dashboard_favoriteCreateManyInput | dashboard_favoriteCreateManyInput[]
  }

  /**
   * dashboard_favorite createManyAndReturn
   */
  export type dashboard_favoriteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboard_favorite
     */
    select?: dashboard_favoriteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the dashboard_favorite
     */
    omit?: dashboard_favoriteOmit<ExtArgs> | null
    /**
     * The data used to create many dashboard_favorites.
     */
    data: dashboard_favoriteCreateManyInput | dashboard_favoriteCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dashboard_favoriteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * dashboard_favorite update
   */
  export type dashboard_favoriteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboard_favorite
     */
    select?: dashboard_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dashboard_favorite
     */
    omit?: dashboard_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dashboard_favoriteInclude<ExtArgs> | null
    /**
     * The data needed to update a dashboard_favorite.
     */
    data: XOR<dashboard_favoriteUpdateInput, dashboard_favoriteUncheckedUpdateInput>
    /**
     * Choose, which dashboard_favorite to update.
     */
    where: dashboard_favoriteWhereUniqueInput
  }

  /**
   * dashboard_favorite updateMany
   */
  export type dashboard_favoriteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update dashboard_favorites.
     */
    data: XOR<dashboard_favoriteUpdateManyMutationInput, dashboard_favoriteUncheckedUpdateManyInput>
    /**
     * Filter which dashboard_favorites to update
     */
    where?: dashboard_favoriteWhereInput
    /**
     * Limit how many dashboard_favorites to update.
     */
    limit?: number
  }

  /**
   * dashboard_favorite updateManyAndReturn
   */
  export type dashboard_favoriteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboard_favorite
     */
    select?: dashboard_favoriteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the dashboard_favorite
     */
    omit?: dashboard_favoriteOmit<ExtArgs> | null
    /**
     * The data used to update dashboard_favorites.
     */
    data: XOR<dashboard_favoriteUpdateManyMutationInput, dashboard_favoriteUncheckedUpdateManyInput>
    /**
     * Filter which dashboard_favorites to update
     */
    where?: dashboard_favoriteWhereInput
    /**
     * Limit how many dashboard_favorites to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dashboard_favoriteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * dashboard_favorite upsert
   */
  export type dashboard_favoriteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboard_favorite
     */
    select?: dashboard_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dashboard_favorite
     */
    omit?: dashboard_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dashboard_favoriteInclude<ExtArgs> | null
    /**
     * The filter to search for the dashboard_favorite to update in case it exists.
     */
    where: dashboard_favoriteWhereUniqueInput
    /**
     * In case the dashboard_favorite found by the `where` argument doesn't exist, create a new dashboard_favorite with this data.
     */
    create: XOR<dashboard_favoriteCreateInput, dashboard_favoriteUncheckedCreateInput>
    /**
     * In case the dashboard_favorite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<dashboard_favoriteUpdateInput, dashboard_favoriteUncheckedUpdateInput>
  }

  /**
   * dashboard_favorite delete
   */
  export type dashboard_favoriteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboard_favorite
     */
    select?: dashboard_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dashboard_favorite
     */
    omit?: dashboard_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dashboard_favoriteInclude<ExtArgs> | null
    /**
     * Filter which dashboard_favorite to delete.
     */
    where: dashboard_favoriteWhereUniqueInput
  }

  /**
   * dashboard_favorite deleteMany
   */
  export type dashboard_favoriteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which dashboard_favorites to delete
     */
    where?: dashboard_favoriteWhereInput
    /**
     * Limit how many dashboard_favorites to delete.
     */
    limit?: number
  }

  /**
   * dashboard_favorite without action
   */
  export type dashboard_favoriteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dashboard_favorite
     */
    select?: dashboard_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dashboard_favorite
     */
    omit?: dashboard_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dashboard_favoriteInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const CardScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    card_name: 'card_name',
    number: 'number',
    cvv: 'cvv',
    holder_name: 'holder_name',
    network: 'network',
    isCredit: 'isCredit',
    expiry_month: 'expiry_month',
    expiry_year: 'expiry_year',
    owner_id: 'owner_id',
    color_name: 'color_name',
    tags: 'tags',
    status: 'status',
    credit_limit: 'credit_limit',
    provider_id: 'provider_id',
    billing_date: 'billing_date',
    payment_date: 'payment_date'
  };

  export type CardScalarFieldEnum = (typeof CardScalarFieldEnum)[keyof typeof CardScalarFieldEnum]


  export const Card_providerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Card_providerScalarFieldEnum = (typeof Card_providerScalarFieldEnum)[keyof typeof Card_providerScalarFieldEnum]


  export const Credential_recordScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    credential_type: 'credential_type',
    service_name: 'service_name',
    identifier: 'identifier',
    secret_token: 'secret_token',
    secret_hash: 'secret_hash',
    secret_last4: 'secret_last4',
    masked_secret: 'masked_secret',
    url: 'url',
    notes: 'notes',
    metadata: 'metadata',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Credential_recordScalarFieldEnum = (typeof Credential_recordScalarFieldEnum)[keyof typeof Credential_recordScalarFieldEnum]


  export const Document_access_auditScalarFieldEnum: {
    id: 'id',
    document_id: 'document_id',
    actor_user_id: 'actor_user_id',
    action: 'action',
    context: 'context',
    created_at: 'created_at'
  };

  export type Document_access_auditScalarFieldEnum = (typeof Document_access_auditScalarFieldEnum)[keyof typeof Document_access_auditScalarFieldEnum]


  export const Document_fileScalarFieldEnum: {
    id: 'id',
    document_id: 'document_id',
    file_path: 'file_path',
    file_side: 'file_side',
    mime_type: 'mime_type',
    size_bytes: 'size_bytes',
    created_at: 'created_at'
  };

  export type Document_fileScalarFieldEnum = (typeof Document_fileScalarFieldEnum)[keyof typeof Document_fileScalarFieldEnum]


  export const Document_recordScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    document_type: 'document_type',
    document_number_token: 'document_number_token',
    document_number_last4: 'document_number_last4',
    document_number_hash: 'document_number_hash',
    masked_number: 'masked_number',
    name_on_document: 'name_on_document',
    metadata: 'metadata',
    verified_at: 'verified_at',
    expires_at: 'expires_at',
    created_at: 'created_at',
    updated_at: 'updated_at',
    category: 'category'
  };

  export type Document_recordScalarFieldEnum = (typeof Document_recordScalarFieldEnum)[keyof typeof Document_recordScalarFieldEnum]


  export const Dashboard_favoriteScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    feature_key: 'feature_key',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Dashboard_favoriteScalarFieldEnum = (typeof Dashboard_favoriteScalarFieldEnum)[keyof typeof Dashboard_favoriteScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    cards?: CardListRelationFilter
    credentials?: Credential_recordListRelationFilter
    documents?: Document_recordListRelationFilter
    documentAccessAudits?: Document_access_auditListRelationFilter
    dashboardFavorites?: Dashboard_favoriteListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    cards?: cardOrderByRelationAggregateInput
    credentials?: credential_recordOrderByRelationAggregateInput
    documents?: document_recordOrderByRelationAggregateInput
    documentAccessAudits?: document_access_auditOrderByRelationAggregateInput
    dashboardFavorites?: dashboard_favoriteOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    cards?: CardListRelationFilter
    credentials?: Credential_recordListRelationFilter
    documents?: Document_recordListRelationFilter
    documentAccessAudits?: Document_access_auditListRelationFilter
    dashboardFavorites?: Dashboard_favoriteListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "token" | "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type cardWhereInput = {
    AND?: cardWhereInput | cardWhereInput[]
    OR?: cardWhereInput[]
    NOT?: cardWhereInput | cardWhereInput[]
    id?: BigIntFilter<"card"> | bigint | number
    created_at?: DateTimeFilter<"card"> | Date | string
    card_name?: StringNullableFilter<"card"> | string | null
    number?: StringFilter<"card"> | string
    cvv?: StringFilter<"card"> | string
    holder_name?: StringNullableFilter<"card"> | string | null
    network?: IntFilter<"card"> | number
    isCredit?: BoolNullableFilter<"card"> | boolean | null
    expiry_month?: IntFilter<"card"> | number
    expiry_year?: IntFilter<"card"> | number
    owner_id?: StringFilter<"card"> | string
    color_name?: StringNullableFilter<"card"> | string | null
    tags?: StringFilter<"card"> | string
    status?: StringFilter<"card"> | string
    credit_limit?: FloatNullableFilter<"card"> | number | null
    provider_id?: BigIntNullableFilter<"card"> | bigint | number | null
    billing_date?: IntNullableFilter<"card"> | number | null
    payment_date?: IntNullableFilter<"card"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    card_provider?: XOR<Card_providerNullableScalarRelationFilter, card_providerWhereInput> | null
  }

  export type cardOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    card_name?: SortOrderInput | SortOrder
    number?: SortOrder
    cvv?: SortOrder
    holder_name?: SortOrderInput | SortOrder
    network?: SortOrder
    isCredit?: SortOrderInput | SortOrder
    expiry_month?: SortOrder
    expiry_year?: SortOrder
    owner_id?: SortOrder
    color_name?: SortOrderInput | SortOrder
    tags?: SortOrder
    status?: SortOrder
    credit_limit?: SortOrderInput | SortOrder
    provider_id?: SortOrderInput | SortOrder
    billing_date?: SortOrderInput | SortOrder
    payment_date?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    card_provider?: card_providerOrderByWithRelationInput
  }

  export type cardWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: cardWhereInput | cardWhereInput[]
    OR?: cardWhereInput[]
    NOT?: cardWhereInput | cardWhereInput[]
    created_at?: DateTimeFilter<"card"> | Date | string
    card_name?: StringNullableFilter<"card"> | string | null
    number?: StringFilter<"card"> | string
    cvv?: StringFilter<"card"> | string
    holder_name?: StringNullableFilter<"card"> | string | null
    network?: IntFilter<"card"> | number
    isCredit?: BoolNullableFilter<"card"> | boolean | null
    expiry_month?: IntFilter<"card"> | number
    expiry_year?: IntFilter<"card"> | number
    owner_id?: StringFilter<"card"> | string
    color_name?: StringNullableFilter<"card"> | string | null
    tags?: StringFilter<"card"> | string
    status?: StringFilter<"card"> | string
    credit_limit?: FloatNullableFilter<"card"> | number | null
    provider_id?: BigIntNullableFilter<"card"> | bigint | number | null
    billing_date?: IntNullableFilter<"card"> | number | null
    payment_date?: IntNullableFilter<"card"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    card_provider?: XOR<Card_providerNullableScalarRelationFilter, card_providerWhereInput> | null
  }, "id">

  export type cardOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    card_name?: SortOrderInput | SortOrder
    number?: SortOrder
    cvv?: SortOrder
    holder_name?: SortOrderInput | SortOrder
    network?: SortOrder
    isCredit?: SortOrderInput | SortOrder
    expiry_month?: SortOrder
    expiry_year?: SortOrder
    owner_id?: SortOrder
    color_name?: SortOrderInput | SortOrder
    tags?: SortOrder
    status?: SortOrder
    credit_limit?: SortOrderInput | SortOrder
    provider_id?: SortOrderInput | SortOrder
    billing_date?: SortOrderInput | SortOrder
    payment_date?: SortOrderInput | SortOrder
    _count?: cardCountOrderByAggregateInput
    _avg?: cardAvgOrderByAggregateInput
    _max?: cardMaxOrderByAggregateInput
    _min?: cardMinOrderByAggregateInput
    _sum?: cardSumOrderByAggregateInput
  }

  export type cardScalarWhereWithAggregatesInput = {
    AND?: cardScalarWhereWithAggregatesInput | cardScalarWhereWithAggregatesInput[]
    OR?: cardScalarWhereWithAggregatesInput[]
    NOT?: cardScalarWhereWithAggregatesInput | cardScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"card"> | bigint | number
    created_at?: DateTimeWithAggregatesFilter<"card"> | Date | string
    card_name?: StringNullableWithAggregatesFilter<"card"> | string | null
    number?: StringWithAggregatesFilter<"card"> | string
    cvv?: StringWithAggregatesFilter<"card"> | string
    holder_name?: StringNullableWithAggregatesFilter<"card"> | string | null
    network?: IntWithAggregatesFilter<"card"> | number
    isCredit?: BoolNullableWithAggregatesFilter<"card"> | boolean | null
    expiry_month?: IntWithAggregatesFilter<"card"> | number
    expiry_year?: IntWithAggregatesFilter<"card"> | number
    owner_id?: StringWithAggregatesFilter<"card"> | string
    color_name?: StringNullableWithAggregatesFilter<"card"> | string | null
    tags?: StringWithAggregatesFilter<"card"> | string
    status?: StringWithAggregatesFilter<"card"> | string
    credit_limit?: FloatNullableWithAggregatesFilter<"card"> | number | null
    provider_id?: BigIntNullableWithAggregatesFilter<"card"> | bigint | number | null
    billing_date?: IntNullableWithAggregatesFilter<"card"> | number | null
    payment_date?: IntNullableWithAggregatesFilter<"card"> | number | null
  }

  export type card_providerWhereInput = {
    AND?: card_providerWhereInput | card_providerWhereInput[]
    OR?: card_providerWhereInput[]
    NOT?: card_providerWhereInput | card_providerWhereInput[]
    id?: BigIntFilter<"card_provider"> | bigint | number
    name?: StringFilter<"card_provider"> | string
    created_at?: DateTimeFilter<"card_provider"> | Date | string
    updated_at?: DateTimeFilter<"card_provider"> | Date | string
    card?: CardListRelationFilter
  }

  export type card_providerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    card?: cardOrderByRelationAggregateInput
  }

  export type card_providerWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: card_providerWhereInput | card_providerWhereInput[]
    OR?: card_providerWhereInput[]
    NOT?: card_providerWhereInput | card_providerWhereInput[]
    name?: StringFilter<"card_provider"> | string
    created_at?: DateTimeFilter<"card_provider"> | Date | string
    updated_at?: DateTimeFilter<"card_provider"> | Date | string
    card?: CardListRelationFilter
  }, "id">

  export type card_providerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: card_providerCountOrderByAggregateInput
    _avg?: card_providerAvgOrderByAggregateInput
    _max?: card_providerMaxOrderByAggregateInput
    _min?: card_providerMinOrderByAggregateInput
    _sum?: card_providerSumOrderByAggregateInput
  }

  export type card_providerScalarWhereWithAggregatesInput = {
    AND?: card_providerScalarWhereWithAggregatesInput | card_providerScalarWhereWithAggregatesInput[]
    OR?: card_providerScalarWhereWithAggregatesInput[]
    NOT?: card_providerScalarWhereWithAggregatesInput | card_providerScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"card_provider"> | bigint | number
    name?: StringWithAggregatesFilter<"card_provider"> | string
    created_at?: DateTimeWithAggregatesFilter<"card_provider"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"card_provider"> | Date | string
  }

  export type credential_recordWhereInput = {
    AND?: credential_recordWhereInput | credential_recordWhereInput[]
    OR?: credential_recordWhereInput[]
    NOT?: credential_recordWhereInput | credential_recordWhereInput[]
    id?: StringFilter<"credential_record"> | string
    user_id?: StringFilter<"credential_record"> | string
    credential_type?: StringFilter<"credential_record"> | string
    service_name?: StringFilter<"credential_record"> | string
    identifier?: StringNullableFilter<"credential_record"> | string | null
    secret_token?: StringFilter<"credential_record"> | string
    secret_hash?: StringFilter<"credential_record"> | string
    secret_last4?: StringFilter<"credential_record"> | string
    masked_secret?: StringFilter<"credential_record"> | string
    url?: StringNullableFilter<"credential_record"> | string | null
    notes?: StringNullableFilter<"credential_record"> | string | null
    metadata?: StringNullableFilter<"credential_record"> | string | null
    created_at?: DateTimeFilter<"credential_record"> | Date | string
    updated_at?: DateTimeFilter<"credential_record"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type credential_recordOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    credential_type?: SortOrder
    service_name?: SortOrder
    identifier?: SortOrderInput | SortOrder
    secret_token?: SortOrder
    secret_hash?: SortOrder
    secret_last4?: SortOrder
    masked_secret?: SortOrder
    url?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type credential_recordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id_credential_type_service_name_identifier?: credential_recordUser_idCredential_typeService_nameIdentifierCompoundUniqueInput
    AND?: credential_recordWhereInput | credential_recordWhereInput[]
    OR?: credential_recordWhereInput[]
    NOT?: credential_recordWhereInput | credential_recordWhereInput[]
    user_id?: StringFilter<"credential_record"> | string
    credential_type?: StringFilter<"credential_record"> | string
    service_name?: StringFilter<"credential_record"> | string
    identifier?: StringNullableFilter<"credential_record"> | string | null
    secret_token?: StringFilter<"credential_record"> | string
    secret_hash?: StringFilter<"credential_record"> | string
    secret_last4?: StringFilter<"credential_record"> | string
    masked_secret?: StringFilter<"credential_record"> | string
    url?: StringNullableFilter<"credential_record"> | string | null
    notes?: StringNullableFilter<"credential_record"> | string | null
    metadata?: StringNullableFilter<"credential_record"> | string | null
    created_at?: DateTimeFilter<"credential_record"> | Date | string
    updated_at?: DateTimeFilter<"credential_record"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "user_id_credential_type_service_name_identifier">

  export type credential_recordOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    credential_type?: SortOrder
    service_name?: SortOrder
    identifier?: SortOrderInput | SortOrder
    secret_token?: SortOrder
    secret_hash?: SortOrder
    secret_last4?: SortOrder
    masked_secret?: SortOrder
    url?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: credential_recordCountOrderByAggregateInput
    _max?: credential_recordMaxOrderByAggregateInput
    _min?: credential_recordMinOrderByAggregateInput
  }

  export type credential_recordScalarWhereWithAggregatesInput = {
    AND?: credential_recordScalarWhereWithAggregatesInput | credential_recordScalarWhereWithAggregatesInput[]
    OR?: credential_recordScalarWhereWithAggregatesInput[]
    NOT?: credential_recordScalarWhereWithAggregatesInput | credential_recordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"credential_record"> | string
    user_id?: StringWithAggregatesFilter<"credential_record"> | string
    credential_type?: StringWithAggregatesFilter<"credential_record"> | string
    service_name?: StringWithAggregatesFilter<"credential_record"> | string
    identifier?: StringNullableWithAggregatesFilter<"credential_record"> | string | null
    secret_token?: StringWithAggregatesFilter<"credential_record"> | string
    secret_hash?: StringWithAggregatesFilter<"credential_record"> | string
    secret_last4?: StringWithAggregatesFilter<"credential_record"> | string
    masked_secret?: StringWithAggregatesFilter<"credential_record"> | string
    url?: StringNullableWithAggregatesFilter<"credential_record"> | string | null
    notes?: StringNullableWithAggregatesFilter<"credential_record"> | string | null
    metadata?: StringNullableWithAggregatesFilter<"credential_record"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"credential_record"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"credential_record"> | Date | string
  }

  export type document_access_auditWhereInput = {
    AND?: document_access_auditWhereInput | document_access_auditWhereInput[]
    OR?: document_access_auditWhereInput[]
    NOT?: document_access_auditWhereInput | document_access_auditWhereInput[]
    id?: BigIntFilter<"document_access_audit"> | bigint | number
    document_id?: StringNullableFilter<"document_access_audit"> | string | null
    actor_user_id?: StringNullableFilter<"document_access_audit"> | string | null
    action?: StringFilter<"document_access_audit"> | string
    context?: StringNullableFilter<"document_access_audit"> | string | null
    created_at?: DateTimeFilter<"document_access_audit"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    document_record?: XOR<Document_recordNullableScalarRelationFilter, document_recordWhereInput> | null
  }

  export type document_access_auditOrderByWithRelationInput = {
    id?: SortOrder
    document_id?: SortOrderInput | SortOrder
    actor_user_id?: SortOrderInput | SortOrder
    action?: SortOrder
    context?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user?: UserOrderByWithRelationInput
    document_record?: document_recordOrderByWithRelationInput
  }

  export type document_access_auditWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: document_access_auditWhereInput | document_access_auditWhereInput[]
    OR?: document_access_auditWhereInput[]
    NOT?: document_access_auditWhereInput | document_access_auditWhereInput[]
    document_id?: StringNullableFilter<"document_access_audit"> | string | null
    actor_user_id?: StringNullableFilter<"document_access_audit"> | string | null
    action?: StringFilter<"document_access_audit"> | string
    context?: StringNullableFilter<"document_access_audit"> | string | null
    created_at?: DateTimeFilter<"document_access_audit"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    document_record?: XOR<Document_recordNullableScalarRelationFilter, document_recordWhereInput> | null
  }, "id">

  export type document_access_auditOrderByWithAggregationInput = {
    id?: SortOrder
    document_id?: SortOrderInput | SortOrder
    actor_user_id?: SortOrderInput | SortOrder
    action?: SortOrder
    context?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: document_access_auditCountOrderByAggregateInput
    _avg?: document_access_auditAvgOrderByAggregateInput
    _max?: document_access_auditMaxOrderByAggregateInput
    _min?: document_access_auditMinOrderByAggregateInput
    _sum?: document_access_auditSumOrderByAggregateInput
  }

  export type document_access_auditScalarWhereWithAggregatesInput = {
    AND?: document_access_auditScalarWhereWithAggregatesInput | document_access_auditScalarWhereWithAggregatesInput[]
    OR?: document_access_auditScalarWhereWithAggregatesInput[]
    NOT?: document_access_auditScalarWhereWithAggregatesInput | document_access_auditScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"document_access_audit"> | bigint | number
    document_id?: StringNullableWithAggregatesFilter<"document_access_audit"> | string | null
    actor_user_id?: StringNullableWithAggregatesFilter<"document_access_audit"> | string | null
    action?: StringWithAggregatesFilter<"document_access_audit"> | string
    context?: StringNullableWithAggregatesFilter<"document_access_audit"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"document_access_audit"> | Date | string
  }

  export type document_fileWhereInput = {
    AND?: document_fileWhereInput | document_fileWhereInput[]
    OR?: document_fileWhereInput[]
    NOT?: document_fileWhereInput | document_fileWhereInput[]
    id?: StringFilter<"document_file"> | string
    document_id?: StringFilter<"document_file"> | string
    file_path?: StringFilter<"document_file"> | string
    file_side?: StringFilter<"document_file"> | string
    mime_type?: StringNullableFilter<"document_file"> | string | null
    size_bytes?: BigIntNullableFilter<"document_file"> | bigint | number | null
    created_at?: DateTimeFilter<"document_file"> | Date | string
    document_record?: XOR<Document_recordScalarRelationFilter, document_recordWhereInput>
  }

  export type document_fileOrderByWithRelationInput = {
    id?: SortOrder
    document_id?: SortOrder
    file_path?: SortOrder
    file_side?: SortOrder
    mime_type?: SortOrderInput | SortOrder
    size_bytes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    document_record?: document_recordOrderByWithRelationInput
  }

  export type document_fileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: document_fileWhereInput | document_fileWhereInput[]
    OR?: document_fileWhereInput[]
    NOT?: document_fileWhereInput | document_fileWhereInput[]
    document_id?: StringFilter<"document_file"> | string
    file_path?: StringFilter<"document_file"> | string
    file_side?: StringFilter<"document_file"> | string
    mime_type?: StringNullableFilter<"document_file"> | string | null
    size_bytes?: BigIntNullableFilter<"document_file"> | bigint | number | null
    created_at?: DateTimeFilter<"document_file"> | Date | string
    document_record?: XOR<Document_recordScalarRelationFilter, document_recordWhereInput>
  }, "id">

  export type document_fileOrderByWithAggregationInput = {
    id?: SortOrder
    document_id?: SortOrder
    file_path?: SortOrder
    file_side?: SortOrder
    mime_type?: SortOrderInput | SortOrder
    size_bytes?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: document_fileCountOrderByAggregateInput
    _avg?: document_fileAvgOrderByAggregateInput
    _max?: document_fileMaxOrderByAggregateInput
    _min?: document_fileMinOrderByAggregateInput
    _sum?: document_fileSumOrderByAggregateInput
  }

  export type document_fileScalarWhereWithAggregatesInput = {
    AND?: document_fileScalarWhereWithAggregatesInput | document_fileScalarWhereWithAggregatesInput[]
    OR?: document_fileScalarWhereWithAggregatesInput[]
    NOT?: document_fileScalarWhereWithAggregatesInput | document_fileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"document_file"> | string
    document_id?: StringWithAggregatesFilter<"document_file"> | string
    file_path?: StringWithAggregatesFilter<"document_file"> | string
    file_side?: StringWithAggregatesFilter<"document_file"> | string
    mime_type?: StringNullableWithAggregatesFilter<"document_file"> | string | null
    size_bytes?: BigIntNullableWithAggregatesFilter<"document_file"> | bigint | number | null
    created_at?: DateTimeWithAggregatesFilter<"document_file"> | Date | string
  }

  export type document_recordWhereInput = {
    AND?: document_recordWhereInput | document_recordWhereInput[]
    OR?: document_recordWhereInput[]
    NOT?: document_recordWhereInput | document_recordWhereInput[]
    id?: StringFilter<"document_record"> | string
    user_id?: StringFilter<"document_record"> | string
    document_type?: StringFilter<"document_record"> | string
    document_number_token?: StringFilter<"document_record"> | string
    document_number_last4?: StringFilter<"document_record"> | string
    document_number_hash?: StringFilter<"document_record"> | string
    masked_number?: StringFilter<"document_record"> | string
    name_on_document?: StringNullableFilter<"document_record"> | string | null
    metadata?: StringNullableFilter<"document_record"> | string | null
    verified_at?: DateTimeNullableFilter<"document_record"> | Date | string | null
    expires_at?: DateTimeNullableFilter<"document_record"> | Date | string | null
    created_at?: DateTimeFilter<"document_record"> | Date | string
    updated_at?: DateTimeFilter<"document_record"> | Date | string
    category?: StringNullableFilter<"document_record"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    document_access_audit?: Document_access_auditListRelationFilter
    document_file?: Document_fileListRelationFilter
  }

  export type document_recordOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    document_type?: SortOrder
    document_number_token?: SortOrder
    document_number_last4?: SortOrder
    document_number_hash?: SortOrder
    masked_number?: SortOrder
    name_on_document?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    verified_at?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    category?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    document_access_audit?: document_access_auditOrderByRelationAggregateInput
    document_file?: document_fileOrderByRelationAggregateInput
  }

  export type document_recordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    document_type_document_number_hash?: document_recordDocument_typeDocument_number_hashCompoundUniqueInput
    AND?: document_recordWhereInput | document_recordWhereInput[]
    OR?: document_recordWhereInput[]
    NOT?: document_recordWhereInput | document_recordWhereInput[]
    user_id?: StringFilter<"document_record"> | string
    document_type?: StringFilter<"document_record"> | string
    document_number_token?: StringFilter<"document_record"> | string
    document_number_last4?: StringFilter<"document_record"> | string
    document_number_hash?: StringFilter<"document_record"> | string
    masked_number?: StringFilter<"document_record"> | string
    name_on_document?: StringNullableFilter<"document_record"> | string | null
    metadata?: StringNullableFilter<"document_record"> | string | null
    verified_at?: DateTimeNullableFilter<"document_record"> | Date | string | null
    expires_at?: DateTimeNullableFilter<"document_record"> | Date | string | null
    created_at?: DateTimeFilter<"document_record"> | Date | string
    updated_at?: DateTimeFilter<"document_record"> | Date | string
    category?: StringNullableFilter<"document_record"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    document_access_audit?: Document_access_auditListRelationFilter
    document_file?: Document_fileListRelationFilter
  }, "id" | "document_type_document_number_hash">

  export type document_recordOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    document_type?: SortOrder
    document_number_token?: SortOrder
    document_number_last4?: SortOrder
    document_number_hash?: SortOrder
    masked_number?: SortOrder
    name_on_document?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    verified_at?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    category?: SortOrderInput | SortOrder
    _count?: document_recordCountOrderByAggregateInput
    _max?: document_recordMaxOrderByAggregateInput
    _min?: document_recordMinOrderByAggregateInput
  }

  export type document_recordScalarWhereWithAggregatesInput = {
    AND?: document_recordScalarWhereWithAggregatesInput | document_recordScalarWhereWithAggregatesInput[]
    OR?: document_recordScalarWhereWithAggregatesInput[]
    NOT?: document_recordScalarWhereWithAggregatesInput | document_recordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"document_record"> | string
    user_id?: StringWithAggregatesFilter<"document_record"> | string
    document_type?: StringWithAggregatesFilter<"document_record"> | string
    document_number_token?: StringWithAggregatesFilter<"document_record"> | string
    document_number_last4?: StringWithAggregatesFilter<"document_record"> | string
    document_number_hash?: StringWithAggregatesFilter<"document_record"> | string
    masked_number?: StringWithAggregatesFilter<"document_record"> | string
    name_on_document?: StringNullableWithAggregatesFilter<"document_record"> | string | null
    metadata?: StringNullableWithAggregatesFilter<"document_record"> | string | null
    verified_at?: DateTimeNullableWithAggregatesFilter<"document_record"> | Date | string | null
    expires_at?: DateTimeNullableWithAggregatesFilter<"document_record"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"document_record"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"document_record"> | Date | string
    category?: StringNullableWithAggregatesFilter<"document_record"> | string | null
  }

  export type dashboard_favoriteWhereInput = {
    AND?: dashboard_favoriteWhereInput | dashboard_favoriteWhereInput[]
    OR?: dashboard_favoriteWhereInput[]
    NOT?: dashboard_favoriteWhereInput | dashboard_favoriteWhereInput[]
    id?: BigIntFilter<"dashboard_favorite"> | bigint | number
    user_id?: StringFilter<"dashboard_favorite"> | string
    feature_key?: StringFilter<"dashboard_favorite"> | string
    created_at?: DateTimeFilter<"dashboard_favorite"> | Date | string
    updated_at?: DateTimeFilter<"dashboard_favorite"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type dashboard_favoriteOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    feature_key?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type dashboard_favoriteWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    user_id_feature_key?: dashboard_favoriteUser_idFeature_keyCompoundUniqueInput
    AND?: dashboard_favoriteWhereInput | dashboard_favoriteWhereInput[]
    OR?: dashboard_favoriteWhereInput[]
    NOT?: dashboard_favoriteWhereInput | dashboard_favoriteWhereInput[]
    user_id?: StringFilter<"dashboard_favorite"> | string
    feature_key?: StringFilter<"dashboard_favorite"> | string
    created_at?: DateTimeFilter<"dashboard_favorite"> | Date | string
    updated_at?: DateTimeFilter<"dashboard_favorite"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "user_id_feature_key">

  export type dashboard_favoriteOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    feature_key?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: dashboard_favoriteCountOrderByAggregateInput
    _avg?: dashboard_favoriteAvgOrderByAggregateInput
    _max?: dashboard_favoriteMaxOrderByAggregateInput
    _min?: dashboard_favoriteMinOrderByAggregateInput
    _sum?: dashboard_favoriteSumOrderByAggregateInput
  }

  export type dashboard_favoriteScalarWhereWithAggregatesInput = {
    AND?: dashboard_favoriteScalarWhereWithAggregatesInput | dashboard_favoriteScalarWhereWithAggregatesInput[]
    OR?: dashboard_favoriteScalarWhereWithAggregatesInput[]
    NOT?: dashboard_favoriteScalarWhereWithAggregatesInput | dashboard_favoriteScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"dashboard_favorite"> | bigint | number
    user_id?: StringWithAggregatesFilter<"dashboard_favorite"> | string
    feature_key?: StringWithAggregatesFilter<"dashboard_favorite"> | string
    created_at?: DateTimeWithAggregatesFilter<"dashboard_favorite"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"dashboard_favorite"> | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    cards?: cardCreateNestedManyWithoutUserInput
    credentials?: credential_recordCreateNestedManyWithoutUserInput
    documents?: document_recordCreateNestedManyWithoutUserInput
    documentAccessAudits?: document_access_auditCreateNestedManyWithoutUserInput
    dashboardFavorites?: dashboard_favoriteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    cards?: cardUncheckedCreateNestedManyWithoutUserInput
    credentials?: credential_recordUncheckedCreateNestedManyWithoutUserInput
    documents?: document_recordUncheckedCreateNestedManyWithoutUserInput
    documentAccessAudits?: document_access_auditUncheckedCreateNestedManyWithoutUserInput
    dashboardFavorites?: dashboard_favoriteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    cards?: cardUpdateManyWithoutUserNestedInput
    credentials?: credential_recordUpdateManyWithoutUserNestedInput
    documents?: document_recordUpdateManyWithoutUserNestedInput
    documentAccessAudits?: document_access_auditUpdateManyWithoutUserNestedInput
    dashboardFavorites?: dashboard_favoriteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    cards?: cardUncheckedUpdateManyWithoutUserNestedInput
    credentials?: credential_recordUncheckedUpdateManyWithoutUserNestedInput
    documents?: document_recordUncheckedUpdateManyWithoutUserNestedInput
    documentAccessAudits?: document_access_auditUncheckedUpdateManyWithoutUserNestedInput
    dashboardFavorites?: dashboard_favoriteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cardCreateInput = {
    id?: bigint | number
    created_at?: Date | string
    card_name?: string | null
    number: string
    cvv: string
    holder_name?: string | null
    network: number
    isCredit?: boolean | null
    expiry_month?: number
    expiry_year?: number
    color_name?: string | null
    tags?: string
    status?: string
    credit_limit?: number | null
    billing_date?: number | null
    payment_date?: number | null
    user: UserCreateNestedOneWithoutCardsInput
    card_provider?: card_providerCreateNestedOneWithoutCardInput
  }

  export type cardUncheckedCreateInput = {
    id?: bigint | number
    created_at?: Date | string
    card_name?: string | null
    number: string
    cvv: string
    holder_name?: string | null
    network: number
    isCredit?: boolean | null
    expiry_month?: number
    expiry_year?: number
    owner_id: string
    color_name?: string | null
    tags?: string
    status?: string
    credit_limit?: number | null
    provider_id?: bigint | number | null
    billing_date?: number | null
    payment_date?: number | null
  }

  export type cardUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    card_name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: StringFieldUpdateOperationsInput | string
    cvv?: StringFieldUpdateOperationsInput | string
    holder_name?: NullableStringFieldUpdateOperationsInput | string | null
    network?: IntFieldUpdateOperationsInput | number
    isCredit?: NullableBoolFieldUpdateOperationsInput | boolean | null
    expiry_month?: IntFieldUpdateOperationsInput | number
    expiry_year?: IntFieldUpdateOperationsInput | number
    color_name?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credit_limit?: NullableFloatFieldUpdateOperationsInput | number | null
    billing_date?: NullableIntFieldUpdateOperationsInput | number | null
    payment_date?: NullableIntFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutCardsNestedInput
    card_provider?: card_providerUpdateOneWithoutCardNestedInput
  }

  export type cardUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    card_name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: StringFieldUpdateOperationsInput | string
    cvv?: StringFieldUpdateOperationsInput | string
    holder_name?: NullableStringFieldUpdateOperationsInput | string | null
    network?: IntFieldUpdateOperationsInput | number
    isCredit?: NullableBoolFieldUpdateOperationsInput | boolean | null
    expiry_month?: IntFieldUpdateOperationsInput | number
    expiry_year?: IntFieldUpdateOperationsInput | number
    owner_id?: StringFieldUpdateOperationsInput | string
    color_name?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credit_limit?: NullableFloatFieldUpdateOperationsInput | number | null
    provider_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    billing_date?: NullableIntFieldUpdateOperationsInput | number | null
    payment_date?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type cardCreateManyInput = {
    id?: bigint | number
    created_at?: Date | string
    card_name?: string | null
    number: string
    cvv: string
    holder_name?: string | null
    network: number
    isCredit?: boolean | null
    expiry_month?: number
    expiry_year?: number
    owner_id: string
    color_name?: string | null
    tags?: string
    status?: string
    credit_limit?: number | null
    provider_id?: bigint | number | null
    billing_date?: number | null
    payment_date?: number | null
  }

  export type cardUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    card_name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: StringFieldUpdateOperationsInput | string
    cvv?: StringFieldUpdateOperationsInput | string
    holder_name?: NullableStringFieldUpdateOperationsInput | string | null
    network?: IntFieldUpdateOperationsInput | number
    isCredit?: NullableBoolFieldUpdateOperationsInput | boolean | null
    expiry_month?: IntFieldUpdateOperationsInput | number
    expiry_year?: IntFieldUpdateOperationsInput | number
    color_name?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credit_limit?: NullableFloatFieldUpdateOperationsInput | number | null
    billing_date?: NullableIntFieldUpdateOperationsInput | number | null
    payment_date?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type cardUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    card_name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: StringFieldUpdateOperationsInput | string
    cvv?: StringFieldUpdateOperationsInput | string
    holder_name?: NullableStringFieldUpdateOperationsInput | string | null
    network?: IntFieldUpdateOperationsInput | number
    isCredit?: NullableBoolFieldUpdateOperationsInput | boolean | null
    expiry_month?: IntFieldUpdateOperationsInput | number
    expiry_year?: IntFieldUpdateOperationsInput | number
    owner_id?: StringFieldUpdateOperationsInput | string
    color_name?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credit_limit?: NullableFloatFieldUpdateOperationsInput | number | null
    provider_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    billing_date?: NullableIntFieldUpdateOperationsInput | number | null
    payment_date?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type card_providerCreateInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    card?: cardCreateNestedManyWithoutCard_providerInput
  }

  export type card_providerUncheckedCreateInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    card?: cardUncheckedCreateNestedManyWithoutCard_providerInput
  }

  export type card_providerUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    card?: cardUpdateManyWithoutCard_providerNestedInput
  }

  export type card_providerUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    card?: cardUncheckedUpdateManyWithoutCard_providerNestedInput
  }

  export type card_providerCreateManyInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type card_providerUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type card_providerUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type credential_recordCreateInput = {
    id?: string
    credential_type: string
    service_name: string
    identifier?: string | null
    secret_token: string
    secret_hash: string
    secret_last4: string
    masked_secret: string
    url?: string | null
    notes?: string | null
    metadata?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutCredentialsInput
  }

  export type credential_recordUncheckedCreateInput = {
    id?: string
    user_id: string
    credential_type: string
    service_name: string
    identifier?: string | null
    secret_token: string
    secret_hash: string
    secret_last4: string
    masked_secret: string
    url?: string | null
    notes?: string | null
    metadata?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type credential_recordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    credential_type?: StringFieldUpdateOperationsInput | string
    service_name?: StringFieldUpdateOperationsInput | string
    identifier?: NullableStringFieldUpdateOperationsInput | string | null
    secret_token?: StringFieldUpdateOperationsInput | string
    secret_hash?: StringFieldUpdateOperationsInput | string
    secret_last4?: StringFieldUpdateOperationsInput | string
    masked_secret?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCredentialsNestedInput
  }

  export type credential_recordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    credential_type?: StringFieldUpdateOperationsInput | string
    service_name?: StringFieldUpdateOperationsInput | string
    identifier?: NullableStringFieldUpdateOperationsInput | string | null
    secret_token?: StringFieldUpdateOperationsInput | string
    secret_hash?: StringFieldUpdateOperationsInput | string
    secret_last4?: StringFieldUpdateOperationsInput | string
    masked_secret?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type credential_recordCreateManyInput = {
    id?: string
    user_id: string
    credential_type: string
    service_name: string
    identifier?: string | null
    secret_token: string
    secret_hash: string
    secret_last4: string
    masked_secret: string
    url?: string | null
    notes?: string | null
    metadata?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type credential_recordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    credential_type?: StringFieldUpdateOperationsInput | string
    service_name?: StringFieldUpdateOperationsInput | string
    identifier?: NullableStringFieldUpdateOperationsInput | string | null
    secret_token?: StringFieldUpdateOperationsInput | string
    secret_hash?: StringFieldUpdateOperationsInput | string
    secret_last4?: StringFieldUpdateOperationsInput | string
    masked_secret?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type credential_recordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    credential_type?: StringFieldUpdateOperationsInput | string
    service_name?: StringFieldUpdateOperationsInput | string
    identifier?: NullableStringFieldUpdateOperationsInput | string | null
    secret_token?: StringFieldUpdateOperationsInput | string
    secret_hash?: StringFieldUpdateOperationsInput | string
    secret_last4?: StringFieldUpdateOperationsInput | string
    masked_secret?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type document_access_auditCreateInput = {
    id?: bigint | number
    action: string
    context?: string | null
    created_at?: Date | string
    user?: UserCreateNestedOneWithoutDocumentAccessAuditsInput
    document_record?: document_recordCreateNestedOneWithoutDocument_access_auditInput
  }

  export type document_access_auditUncheckedCreateInput = {
    id?: bigint | number
    document_id?: string | null
    actor_user_id?: string | null
    action: string
    context?: string | null
    created_at?: Date | string
  }

  export type document_access_auditUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutDocumentAccessAuditsNestedInput
    document_record?: document_recordUpdateOneWithoutDocument_access_auditNestedInput
  }

  export type document_access_auditUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    document_id?: NullableStringFieldUpdateOperationsInput | string | null
    actor_user_id?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type document_access_auditCreateManyInput = {
    id?: bigint | number
    document_id?: string | null
    actor_user_id?: string | null
    action: string
    context?: string | null
    created_at?: Date | string
  }

  export type document_access_auditUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type document_access_auditUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    document_id?: NullableStringFieldUpdateOperationsInput | string | null
    actor_user_id?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type document_fileCreateInput = {
    id?: string
    file_path: string
    file_side?: string
    mime_type?: string | null
    size_bytes?: bigint | number | null
    created_at?: Date | string
    document_record: document_recordCreateNestedOneWithoutDocument_fileInput
  }

  export type document_fileUncheckedCreateInput = {
    id?: string
    document_id: string
    file_path: string
    file_side?: string
    mime_type?: string | null
    size_bytes?: bigint | number | null
    created_at?: Date | string
  }

  export type document_fileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_side?: StringFieldUpdateOperationsInput | string
    mime_type?: NullableStringFieldUpdateOperationsInput | string | null
    size_bytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    document_record?: document_recordUpdateOneRequiredWithoutDocument_fileNestedInput
  }

  export type document_fileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    document_id?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_side?: StringFieldUpdateOperationsInput | string
    mime_type?: NullableStringFieldUpdateOperationsInput | string | null
    size_bytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type document_fileCreateManyInput = {
    id?: string
    document_id: string
    file_path: string
    file_side?: string
    mime_type?: string | null
    size_bytes?: bigint | number | null
    created_at?: Date | string
  }

  export type document_fileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_side?: StringFieldUpdateOperationsInput | string
    mime_type?: NullableStringFieldUpdateOperationsInput | string | null
    size_bytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type document_fileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    document_id?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_side?: StringFieldUpdateOperationsInput | string
    mime_type?: NullableStringFieldUpdateOperationsInput | string | null
    size_bytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type document_recordCreateInput = {
    id?: string
    document_type: string
    document_number_token: string
    document_number_last4: string
    document_number_hash: string
    masked_number: string
    name_on_document?: string | null
    metadata?: string | null
    verified_at?: Date | string | null
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    category?: string | null
    user: UserCreateNestedOneWithoutDocumentsInput
    document_access_audit?: document_access_auditCreateNestedManyWithoutDocument_recordInput
    document_file?: document_fileCreateNestedManyWithoutDocument_recordInput
  }

  export type document_recordUncheckedCreateInput = {
    id?: string
    user_id: string
    document_type: string
    document_number_token: string
    document_number_last4: string
    document_number_hash: string
    masked_number: string
    name_on_document?: string | null
    metadata?: string | null
    verified_at?: Date | string | null
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    category?: string | null
    document_access_audit?: document_access_auditUncheckedCreateNestedManyWithoutDocument_recordInput
    document_file?: document_fileUncheckedCreateNestedManyWithoutDocument_recordInput
  }

  export type document_recordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    document_type?: StringFieldUpdateOperationsInput | string
    document_number_token?: StringFieldUpdateOperationsInput | string
    document_number_last4?: StringFieldUpdateOperationsInput | string
    document_number_hash?: StringFieldUpdateOperationsInput | string
    masked_number?: StringFieldUpdateOperationsInput | string
    name_on_document?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutDocumentsNestedInput
    document_access_audit?: document_access_auditUpdateManyWithoutDocument_recordNestedInput
    document_file?: document_fileUpdateManyWithoutDocument_recordNestedInput
  }

  export type document_recordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    document_type?: StringFieldUpdateOperationsInput | string
    document_number_token?: StringFieldUpdateOperationsInput | string
    document_number_last4?: StringFieldUpdateOperationsInput | string
    document_number_hash?: StringFieldUpdateOperationsInput | string
    masked_number?: StringFieldUpdateOperationsInput | string
    name_on_document?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    document_access_audit?: document_access_auditUncheckedUpdateManyWithoutDocument_recordNestedInput
    document_file?: document_fileUncheckedUpdateManyWithoutDocument_recordNestedInput
  }

  export type document_recordCreateManyInput = {
    id?: string
    user_id: string
    document_type: string
    document_number_token: string
    document_number_last4: string
    document_number_hash: string
    masked_number: string
    name_on_document?: string | null
    metadata?: string | null
    verified_at?: Date | string | null
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    category?: string | null
  }

  export type document_recordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    document_type?: StringFieldUpdateOperationsInput | string
    document_number_token?: StringFieldUpdateOperationsInput | string
    document_number_last4?: StringFieldUpdateOperationsInput | string
    document_number_hash?: StringFieldUpdateOperationsInput | string
    masked_number?: StringFieldUpdateOperationsInput | string
    name_on_document?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type document_recordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    document_type?: StringFieldUpdateOperationsInput | string
    document_number_token?: StringFieldUpdateOperationsInput | string
    document_number_last4?: StringFieldUpdateOperationsInput | string
    document_number_hash?: StringFieldUpdateOperationsInput | string
    masked_number?: StringFieldUpdateOperationsInput | string
    name_on_document?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type dashboard_favoriteCreateInput = {
    id?: bigint | number
    feature_key: string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutDashboardFavoritesInput
  }

  export type dashboard_favoriteUncheckedCreateInput = {
    id?: bigint | number
    user_id: string
    feature_key: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type dashboard_favoriteUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    feature_key?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDashboardFavoritesNestedInput
  }

  export type dashboard_favoriteUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: StringFieldUpdateOperationsInput | string
    feature_key?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type dashboard_favoriteCreateManyInput = {
    id?: bigint | number
    user_id: string
    feature_key: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type dashboard_favoriteUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    feature_key?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type dashboard_favoriteUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: StringFieldUpdateOperationsInput | string
    feature_key?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type CardListRelationFilter = {
    every?: cardWhereInput
    some?: cardWhereInput
    none?: cardWhereInput
  }

  export type Credential_recordListRelationFilter = {
    every?: credential_recordWhereInput
    some?: credential_recordWhereInput
    none?: credential_recordWhereInput
  }

  export type Document_recordListRelationFilter = {
    every?: document_recordWhereInput
    some?: document_recordWhereInput
    none?: document_recordWhereInput
  }

  export type Document_access_auditListRelationFilter = {
    every?: document_access_auditWhereInput
    some?: document_access_auditWhereInput
    none?: document_access_auditWhereInput
  }

  export type Dashboard_favoriteListRelationFilter = {
    every?: dashboard_favoriteWhereInput
    some?: dashboard_favoriteWhereInput
    none?: dashboard_favoriteWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type cardOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type credential_recordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type document_recordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type document_access_auditOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type dashboard_favoriteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type Card_providerNullableScalarRelationFilter = {
    is?: card_providerWhereInput | null
    isNot?: card_providerWhereInput | null
  }

  export type cardCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    card_name?: SortOrder
    number?: SortOrder
    cvv?: SortOrder
    holder_name?: SortOrder
    network?: SortOrder
    isCredit?: SortOrder
    expiry_month?: SortOrder
    expiry_year?: SortOrder
    owner_id?: SortOrder
    color_name?: SortOrder
    tags?: SortOrder
    status?: SortOrder
    credit_limit?: SortOrder
    provider_id?: SortOrder
    billing_date?: SortOrder
    payment_date?: SortOrder
  }

  export type cardAvgOrderByAggregateInput = {
    id?: SortOrder
    network?: SortOrder
    expiry_month?: SortOrder
    expiry_year?: SortOrder
    credit_limit?: SortOrder
    provider_id?: SortOrder
    billing_date?: SortOrder
    payment_date?: SortOrder
  }

  export type cardMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    card_name?: SortOrder
    number?: SortOrder
    cvv?: SortOrder
    holder_name?: SortOrder
    network?: SortOrder
    isCredit?: SortOrder
    expiry_month?: SortOrder
    expiry_year?: SortOrder
    owner_id?: SortOrder
    color_name?: SortOrder
    tags?: SortOrder
    status?: SortOrder
    credit_limit?: SortOrder
    provider_id?: SortOrder
    billing_date?: SortOrder
    payment_date?: SortOrder
  }

  export type cardMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    card_name?: SortOrder
    number?: SortOrder
    cvv?: SortOrder
    holder_name?: SortOrder
    network?: SortOrder
    isCredit?: SortOrder
    expiry_month?: SortOrder
    expiry_year?: SortOrder
    owner_id?: SortOrder
    color_name?: SortOrder
    tags?: SortOrder
    status?: SortOrder
    credit_limit?: SortOrder
    provider_id?: SortOrder
    billing_date?: SortOrder
    payment_date?: SortOrder
  }

  export type cardSumOrderByAggregateInput = {
    id?: SortOrder
    network?: SortOrder
    expiry_month?: SortOrder
    expiry_year?: SortOrder
    credit_limit?: SortOrder
    provider_id?: SortOrder
    billing_date?: SortOrder
    payment_date?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type card_providerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type card_providerAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type card_providerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type card_providerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type card_providerSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type credential_recordUser_idCredential_typeService_nameIdentifierCompoundUniqueInput = {
    user_id: string
    credential_type: string
    service_name: string
    identifier: string
  }

  export type credential_recordCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    credential_type?: SortOrder
    service_name?: SortOrder
    identifier?: SortOrder
    secret_token?: SortOrder
    secret_hash?: SortOrder
    secret_last4?: SortOrder
    masked_secret?: SortOrder
    url?: SortOrder
    notes?: SortOrder
    metadata?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type credential_recordMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    credential_type?: SortOrder
    service_name?: SortOrder
    identifier?: SortOrder
    secret_token?: SortOrder
    secret_hash?: SortOrder
    secret_last4?: SortOrder
    masked_secret?: SortOrder
    url?: SortOrder
    notes?: SortOrder
    metadata?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type credential_recordMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    credential_type?: SortOrder
    service_name?: SortOrder
    identifier?: SortOrder
    secret_token?: SortOrder
    secret_hash?: SortOrder
    secret_last4?: SortOrder
    masked_secret?: SortOrder
    url?: SortOrder
    notes?: SortOrder
    metadata?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type Document_recordNullableScalarRelationFilter = {
    is?: document_recordWhereInput | null
    isNot?: document_recordWhereInput | null
  }

  export type document_access_auditCountOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    actor_user_id?: SortOrder
    action?: SortOrder
    context?: SortOrder
    created_at?: SortOrder
  }

  export type document_access_auditAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type document_access_auditMaxOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    actor_user_id?: SortOrder
    action?: SortOrder
    context?: SortOrder
    created_at?: SortOrder
  }

  export type document_access_auditMinOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    actor_user_id?: SortOrder
    action?: SortOrder
    context?: SortOrder
    created_at?: SortOrder
  }

  export type document_access_auditSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type Document_recordScalarRelationFilter = {
    is?: document_recordWhereInput
    isNot?: document_recordWhereInput
  }

  export type document_fileCountOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    file_path?: SortOrder
    file_side?: SortOrder
    mime_type?: SortOrder
    size_bytes?: SortOrder
    created_at?: SortOrder
  }

  export type document_fileAvgOrderByAggregateInput = {
    size_bytes?: SortOrder
  }

  export type document_fileMaxOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    file_path?: SortOrder
    file_side?: SortOrder
    mime_type?: SortOrder
    size_bytes?: SortOrder
    created_at?: SortOrder
  }

  export type document_fileMinOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    file_path?: SortOrder
    file_side?: SortOrder
    mime_type?: SortOrder
    size_bytes?: SortOrder
    created_at?: SortOrder
  }

  export type document_fileSumOrderByAggregateInput = {
    size_bytes?: SortOrder
  }

  export type Document_fileListRelationFilter = {
    every?: document_fileWhereInput
    some?: document_fileWhereInput
    none?: document_fileWhereInput
  }

  export type document_fileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type document_recordDocument_typeDocument_number_hashCompoundUniqueInput = {
    document_type: string
    document_number_hash: string
  }

  export type document_recordCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    document_type?: SortOrder
    document_number_token?: SortOrder
    document_number_last4?: SortOrder
    document_number_hash?: SortOrder
    masked_number?: SortOrder
    name_on_document?: SortOrder
    metadata?: SortOrder
    verified_at?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    category?: SortOrder
  }

  export type document_recordMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    document_type?: SortOrder
    document_number_token?: SortOrder
    document_number_last4?: SortOrder
    document_number_hash?: SortOrder
    masked_number?: SortOrder
    name_on_document?: SortOrder
    metadata?: SortOrder
    verified_at?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    category?: SortOrder
  }

  export type document_recordMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    document_type?: SortOrder
    document_number_token?: SortOrder
    document_number_last4?: SortOrder
    document_number_hash?: SortOrder
    masked_number?: SortOrder
    name_on_document?: SortOrder
    metadata?: SortOrder
    verified_at?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    category?: SortOrder
  }

  export type dashboard_favoriteUser_idFeature_keyCompoundUniqueInput = {
    user_id: string
    feature_key: string
  }

  export type dashboard_favoriteCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    feature_key?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type dashboard_favoriteAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type dashboard_favoriteMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    feature_key?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type dashboard_favoriteMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    feature_key?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type dashboard_favoriteSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type cardCreateNestedManyWithoutUserInput = {
    create?: XOR<cardCreateWithoutUserInput, cardUncheckedCreateWithoutUserInput> | cardCreateWithoutUserInput[] | cardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: cardCreateOrConnectWithoutUserInput | cardCreateOrConnectWithoutUserInput[]
    createMany?: cardCreateManyUserInputEnvelope
    connect?: cardWhereUniqueInput | cardWhereUniqueInput[]
  }

  export type credential_recordCreateNestedManyWithoutUserInput = {
    create?: XOR<credential_recordCreateWithoutUserInput, credential_recordUncheckedCreateWithoutUserInput> | credential_recordCreateWithoutUserInput[] | credential_recordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: credential_recordCreateOrConnectWithoutUserInput | credential_recordCreateOrConnectWithoutUserInput[]
    createMany?: credential_recordCreateManyUserInputEnvelope
    connect?: credential_recordWhereUniqueInput | credential_recordWhereUniqueInput[]
  }

  export type document_recordCreateNestedManyWithoutUserInput = {
    create?: XOR<document_recordCreateWithoutUserInput, document_recordUncheckedCreateWithoutUserInput> | document_recordCreateWithoutUserInput[] | document_recordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: document_recordCreateOrConnectWithoutUserInput | document_recordCreateOrConnectWithoutUserInput[]
    createMany?: document_recordCreateManyUserInputEnvelope
    connect?: document_recordWhereUniqueInput | document_recordWhereUniqueInput[]
  }

  export type document_access_auditCreateNestedManyWithoutUserInput = {
    create?: XOR<document_access_auditCreateWithoutUserInput, document_access_auditUncheckedCreateWithoutUserInput> | document_access_auditCreateWithoutUserInput[] | document_access_auditUncheckedCreateWithoutUserInput[]
    connectOrCreate?: document_access_auditCreateOrConnectWithoutUserInput | document_access_auditCreateOrConnectWithoutUserInput[]
    createMany?: document_access_auditCreateManyUserInputEnvelope
    connect?: document_access_auditWhereUniqueInput | document_access_auditWhereUniqueInput[]
  }

  export type dashboard_favoriteCreateNestedManyWithoutUserInput = {
    create?: XOR<dashboard_favoriteCreateWithoutUserInput, dashboard_favoriteUncheckedCreateWithoutUserInput> | dashboard_favoriteCreateWithoutUserInput[] | dashboard_favoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: dashboard_favoriteCreateOrConnectWithoutUserInput | dashboard_favoriteCreateOrConnectWithoutUserInput[]
    createMany?: dashboard_favoriteCreateManyUserInputEnvelope
    connect?: dashboard_favoriteWhereUniqueInput | dashboard_favoriteWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type cardUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<cardCreateWithoutUserInput, cardUncheckedCreateWithoutUserInput> | cardCreateWithoutUserInput[] | cardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: cardCreateOrConnectWithoutUserInput | cardCreateOrConnectWithoutUserInput[]
    createMany?: cardCreateManyUserInputEnvelope
    connect?: cardWhereUniqueInput | cardWhereUniqueInput[]
  }

  export type credential_recordUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<credential_recordCreateWithoutUserInput, credential_recordUncheckedCreateWithoutUserInput> | credential_recordCreateWithoutUserInput[] | credential_recordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: credential_recordCreateOrConnectWithoutUserInput | credential_recordCreateOrConnectWithoutUserInput[]
    createMany?: credential_recordCreateManyUserInputEnvelope
    connect?: credential_recordWhereUniqueInput | credential_recordWhereUniqueInput[]
  }

  export type document_recordUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<document_recordCreateWithoutUserInput, document_recordUncheckedCreateWithoutUserInput> | document_recordCreateWithoutUserInput[] | document_recordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: document_recordCreateOrConnectWithoutUserInput | document_recordCreateOrConnectWithoutUserInput[]
    createMany?: document_recordCreateManyUserInputEnvelope
    connect?: document_recordWhereUniqueInput | document_recordWhereUniqueInput[]
  }

  export type document_access_auditUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<document_access_auditCreateWithoutUserInput, document_access_auditUncheckedCreateWithoutUserInput> | document_access_auditCreateWithoutUserInput[] | document_access_auditUncheckedCreateWithoutUserInput[]
    connectOrCreate?: document_access_auditCreateOrConnectWithoutUserInput | document_access_auditCreateOrConnectWithoutUserInput[]
    createMany?: document_access_auditCreateManyUserInputEnvelope
    connect?: document_access_auditWhereUniqueInput | document_access_auditWhereUniqueInput[]
  }

  export type dashboard_favoriteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<dashboard_favoriteCreateWithoutUserInput, dashboard_favoriteUncheckedCreateWithoutUserInput> | dashboard_favoriteCreateWithoutUserInput[] | dashboard_favoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: dashboard_favoriteCreateOrConnectWithoutUserInput | dashboard_favoriteCreateOrConnectWithoutUserInput[]
    createMany?: dashboard_favoriteCreateManyUserInputEnvelope
    connect?: dashboard_favoriteWhereUniqueInput | dashboard_favoriteWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type cardUpdateManyWithoutUserNestedInput = {
    create?: XOR<cardCreateWithoutUserInput, cardUncheckedCreateWithoutUserInput> | cardCreateWithoutUserInput[] | cardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: cardCreateOrConnectWithoutUserInput | cardCreateOrConnectWithoutUserInput[]
    upsert?: cardUpsertWithWhereUniqueWithoutUserInput | cardUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: cardCreateManyUserInputEnvelope
    set?: cardWhereUniqueInput | cardWhereUniqueInput[]
    disconnect?: cardWhereUniqueInput | cardWhereUniqueInput[]
    delete?: cardWhereUniqueInput | cardWhereUniqueInput[]
    connect?: cardWhereUniqueInput | cardWhereUniqueInput[]
    update?: cardUpdateWithWhereUniqueWithoutUserInput | cardUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: cardUpdateManyWithWhereWithoutUserInput | cardUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: cardScalarWhereInput | cardScalarWhereInput[]
  }

  export type credential_recordUpdateManyWithoutUserNestedInput = {
    create?: XOR<credential_recordCreateWithoutUserInput, credential_recordUncheckedCreateWithoutUserInput> | credential_recordCreateWithoutUserInput[] | credential_recordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: credential_recordCreateOrConnectWithoutUserInput | credential_recordCreateOrConnectWithoutUserInput[]
    upsert?: credential_recordUpsertWithWhereUniqueWithoutUserInput | credential_recordUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: credential_recordCreateManyUserInputEnvelope
    set?: credential_recordWhereUniqueInput | credential_recordWhereUniqueInput[]
    disconnect?: credential_recordWhereUniqueInput | credential_recordWhereUniqueInput[]
    delete?: credential_recordWhereUniqueInput | credential_recordWhereUniqueInput[]
    connect?: credential_recordWhereUniqueInput | credential_recordWhereUniqueInput[]
    update?: credential_recordUpdateWithWhereUniqueWithoutUserInput | credential_recordUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: credential_recordUpdateManyWithWhereWithoutUserInput | credential_recordUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: credential_recordScalarWhereInput | credential_recordScalarWhereInput[]
  }

  export type document_recordUpdateManyWithoutUserNestedInput = {
    create?: XOR<document_recordCreateWithoutUserInput, document_recordUncheckedCreateWithoutUserInput> | document_recordCreateWithoutUserInput[] | document_recordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: document_recordCreateOrConnectWithoutUserInput | document_recordCreateOrConnectWithoutUserInput[]
    upsert?: document_recordUpsertWithWhereUniqueWithoutUserInput | document_recordUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: document_recordCreateManyUserInputEnvelope
    set?: document_recordWhereUniqueInput | document_recordWhereUniqueInput[]
    disconnect?: document_recordWhereUniqueInput | document_recordWhereUniqueInput[]
    delete?: document_recordWhereUniqueInput | document_recordWhereUniqueInput[]
    connect?: document_recordWhereUniqueInput | document_recordWhereUniqueInput[]
    update?: document_recordUpdateWithWhereUniqueWithoutUserInput | document_recordUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: document_recordUpdateManyWithWhereWithoutUserInput | document_recordUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: document_recordScalarWhereInput | document_recordScalarWhereInput[]
  }

  export type document_access_auditUpdateManyWithoutUserNestedInput = {
    create?: XOR<document_access_auditCreateWithoutUserInput, document_access_auditUncheckedCreateWithoutUserInput> | document_access_auditCreateWithoutUserInput[] | document_access_auditUncheckedCreateWithoutUserInput[]
    connectOrCreate?: document_access_auditCreateOrConnectWithoutUserInput | document_access_auditCreateOrConnectWithoutUserInput[]
    upsert?: document_access_auditUpsertWithWhereUniqueWithoutUserInput | document_access_auditUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: document_access_auditCreateManyUserInputEnvelope
    set?: document_access_auditWhereUniqueInput | document_access_auditWhereUniqueInput[]
    disconnect?: document_access_auditWhereUniqueInput | document_access_auditWhereUniqueInput[]
    delete?: document_access_auditWhereUniqueInput | document_access_auditWhereUniqueInput[]
    connect?: document_access_auditWhereUniqueInput | document_access_auditWhereUniqueInput[]
    update?: document_access_auditUpdateWithWhereUniqueWithoutUserInput | document_access_auditUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: document_access_auditUpdateManyWithWhereWithoutUserInput | document_access_auditUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: document_access_auditScalarWhereInput | document_access_auditScalarWhereInput[]
  }

  export type dashboard_favoriteUpdateManyWithoutUserNestedInput = {
    create?: XOR<dashboard_favoriteCreateWithoutUserInput, dashboard_favoriteUncheckedCreateWithoutUserInput> | dashboard_favoriteCreateWithoutUserInput[] | dashboard_favoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: dashboard_favoriteCreateOrConnectWithoutUserInput | dashboard_favoriteCreateOrConnectWithoutUserInput[]
    upsert?: dashboard_favoriteUpsertWithWhereUniqueWithoutUserInput | dashboard_favoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: dashboard_favoriteCreateManyUserInputEnvelope
    set?: dashboard_favoriteWhereUniqueInput | dashboard_favoriteWhereUniqueInput[]
    disconnect?: dashboard_favoriteWhereUniqueInput | dashboard_favoriteWhereUniqueInput[]
    delete?: dashboard_favoriteWhereUniqueInput | dashboard_favoriteWhereUniqueInput[]
    connect?: dashboard_favoriteWhereUniqueInput | dashboard_favoriteWhereUniqueInput[]
    update?: dashboard_favoriteUpdateWithWhereUniqueWithoutUserInput | dashboard_favoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: dashboard_favoriteUpdateManyWithWhereWithoutUserInput | dashboard_favoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: dashboard_favoriteScalarWhereInput | dashboard_favoriteScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type cardUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<cardCreateWithoutUserInput, cardUncheckedCreateWithoutUserInput> | cardCreateWithoutUserInput[] | cardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: cardCreateOrConnectWithoutUserInput | cardCreateOrConnectWithoutUserInput[]
    upsert?: cardUpsertWithWhereUniqueWithoutUserInput | cardUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: cardCreateManyUserInputEnvelope
    set?: cardWhereUniqueInput | cardWhereUniqueInput[]
    disconnect?: cardWhereUniqueInput | cardWhereUniqueInput[]
    delete?: cardWhereUniqueInput | cardWhereUniqueInput[]
    connect?: cardWhereUniqueInput | cardWhereUniqueInput[]
    update?: cardUpdateWithWhereUniqueWithoutUserInput | cardUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: cardUpdateManyWithWhereWithoutUserInput | cardUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: cardScalarWhereInput | cardScalarWhereInput[]
  }

  export type credential_recordUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<credential_recordCreateWithoutUserInput, credential_recordUncheckedCreateWithoutUserInput> | credential_recordCreateWithoutUserInput[] | credential_recordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: credential_recordCreateOrConnectWithoutUserInput | credential_recordCreateOrConnectWithoutUserInput[]
    upsert?: credential_recordUpsertWithWhereUniqueWithoutUserInput | credential_recordUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: credential_recordCreateManyUserInputEnvelope
    set?: credential_recordWhereUniqueInput | credential_recordWhereUniqueInput[]
    disconnect?: credential_recordWhereUniqueInput | credential_recordWhereUniqueInput[]
    delete?: credential_recordWhereUniqueInput | credential_recordWhereUniqueInput[]
    connect?: credential_recordWhereUniqueInput | credential_recordWhereUniqueInput[]
    update?: credential_recordUpdateWithWhereUniqueWithoutUserInput | credential_recordUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: credential_recordUpdateManyWithWhereWithoutUserInput | credential_recordUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: credential_recordScalarWhereInput | credential_recordScalarWhereInput[]
  }

  export type document_recordUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<document_recordCreateWithoutUserInput, document_recordUncheckedCreateWithoutUserInput> | document_recordCreateWithoutUserInput[] | document_recordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: document_recordCreateOrConnectWithoutUserInput | document_recordCreateOrConnectWithoutUserInput[]
    upsert?: document_recordUpsertWithWhereUniqueWithoutUserInput | document_recordUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: document_recordCreateManyUserInputEnvelope
    set?: document_recordWhereUniqueInput | document_recordWhereUniqueInput[]
    disconnect?: document_recordWhereUniqueInput | document_recordWhereUniqueInput[]
    delete?: document_recordWhereUniqueInput | document_recordWhereUniqueInput[]
    connect?: document_recordWhereUniqueInput | document_recordWhereUniqueInput[]
    update?: document_recordUpdateWithWhereUniqueWithoutUserInput | document_recordUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: document_recordUpdateManyWithWhereWithoutUserInput | document_recordUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: document_recordScalarWhereInput | document_recordScalarWhereInput[]
  }

  export type document_access_auditUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<document_access_auditCreateWithoutUserInput, document_access_auditUncheckedCreateWithoutUserInput> | document_access_auditCreateWithoutUserInput[] | document_access_auditUncheckedCreateWithoutUserInput[]
    connectOrCreate?: document_access_auditCreateOrConnectWithoutUserInput | document_access_auditCreateOrConnectWithoutUserInput[]
    upsert?: document_access_auditUpsertWithWhereUniqueWithoutUserInput | document_access_auditUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: document_access_auditCreateManyUserInputEnvelope
    set?: document_access_auditWhereUniqueInput | document_access_auditWhereUniqueInput[]
    disconnect?: document_access_auditWhereUniqueInput | document_access_auditWhereUniqueInput[]
    delete?: document_access_auditWhereUniqueInput | document_access_auditWhereUniqueInput[]
    connect?: document_access_auditWhereUniqueInput | document_access_auditWhereUniqueInput[]
    update?: document_access_auditUpdateWithWhereUniqueWithoutUserInput | document_access_auditUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: document_access_auditUpdateManyWithWhereWithoutUserInput | document_access_auditUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: document_access_auditScalarWhereInput | document_access_auditScalarWhereInput[]
  }

  export type dashboard_favoriteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<dashboard_favoriteCreateWithoutUserInput, dashboard_favoriteUncheckedCreateWithoutUserInput> | dashboard_favoriteCreateWithoutUserInput[] | dashboard_favoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: dashboard_favoriteCreateOrConnectWithoutUserInput | dashboard_favoriteCreateOrConnectWithoutUserInput[]
    upsert?: dashboard_favoriteUpsertWithWhereUniqueWithoutUserInput | dashboard_favoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: dashboard_favoriteCreateManyUserInputEnvelope
    set?: dashboard_favoriteWhereUniqueInput | dashboard_favoriteWhereUniqueInput[]
    disconnect?: dashboard_favoriteWhereUniqueInput | dashboard_favoriteWhereUniqueInput[]
    delete?: dashboard_favoriteWhereUniqueInput | dashboard_favoriteWhereUniqueInput[]
    connect?: dashboard_favoriteWhereUniqueInput | dashboard_favoriteWhereUniqueInput[]
    update?: dashboard_favoriteUpdateWithWhereUniqueWithoutUserInput | dashboard_favoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: dashboard_favoriteUpdateManyWithWhereWithoutUserInput | dashboard_favoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: dashboard_favoriteScalarWhereInput | dashboard_favoriteScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCardsInput = {
    create?: XOR<UserCreateWithoutCardsInput, UserUncheckedCreateWithoutCardsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCardsInput
    connect?: UserWhereUniqueInput
  }

  export type card_providerCreateNestedOneWithoutCardInput = {
    create?: XOR<card_providerCreateWithoutCardInput, card_providerUncheckedCreateWithoutCardInput>
    connectOrCreate?: card_providerCreateOrConnectWithoutCardInput
    connect?: card_providerWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutCardsNestedInput = {
    create?: XOR<UserCreateWithoutCardsInput, UserUncheckedCreateWithoutCardsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCardsInput
    upsert?: UserUpsertWithoutCardsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCardsInput, UserUpdateWithoutCardsInput>, UserUncheckedUpdateWithoutCardsInput>
  }

  export type card_providerUpdateOneWithoutCardNestedInput = {
    create?: XOR<card_providerCreateWithoutCardInput, card_providerUncheckedCreateWithoutCardInput>
    connectOrCreate?: card_providerCreateOrConnectWithoutCardInput
    upsert?: card_providerUpsertWithoutCardInput
    disconnect?: card_providerWhereInput | boolean
    delete?: card_providerWhereInput | boolean
    connect?: card_providerWhereUniqueInput
    update?: XOR<XOR<card_providerUpdateToOneWithWhereWithoutCardInput, card_providerUpdateWithoutCardInput>, card_providerUncheckedUpdateWithoutCardInput>
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type cardCreateNestedManyWithoutCard_providerInput = {
    create?: XOR<cardCreateWithoutCard_providerInput, cardUncheckedCreateWithoutCard_providerInput> | cardCreateWithoutCard_providerInput[] | cardUncheckedCreateWithoutCard_providerInput[]
    connectOrCreate?: cardCreateOrConnectWithoutCard_providerInput | cardCreateOrConnectWithoutCard_providerInput[]
    createMany?: cardCreateManyCard_providerInputEnvelope
    connect?: cardWhereUniqueInput | cardWhereUniqueInput[]
  }

  export type cardUncheckedCreateNestedManyWithoutCard_providerInput = {
    create?: XOR<cardCreateWithoutCard_providerInput, cardUncheckedCreateWithoutCard_providerInput> | cardCreateWithoutCard_providerInput[] | cardUncheckedCreateWithoutCard_providerInput[]
    connectOrCreate?: cardCreateOrConnectWithoutCard_providerInput | cardCreateOrConnectWithoutCard_providerInput[]
    createMany?: cardCreateManyCard_providerInputEnvelope
    connect?: cardWhereUniqueInput | cardWhereUniqueInput[]
  }

  export type cardUpdateManyWithoutCard_providerNestedInput = {
    create?: XOR<cardCreateWithoutCard_providerInput, cardUncheckedCreateWithoutCard_providerInput> | cardCreateWithoutCard_providerInput[] | cardUncheckedCreateWithoutCard_providerInput[]
    connectOrCreate?: cardCreateOrConnectWithoutCard_providerInput | cardCreateOrConnectWithoutCard_providerInput[]
    upsert?: cardUpsertWithWhereUniqueWithoutCard_providerInput | cardUpsertWithWhereUniqueWithoutCard_providerInput[]
    createMany?: cardCreateManyCard_providerInputEnvelope
    set?: cardWhereUniqueInput | cardWhereUniqueInput[]
    disconnect?: cardWhereUniqueInput | cardWhereUniqueInput[]
    delete?: cardWhereUniqueInput | cardWhereUniqueInput[]
    connect?: cardWhereUniqueInput | cardWhereUniqueInput[]
    update?: cardUpdateWithWhereUniqueWithoutCard_providerInput | cardUpdateWithWhereUniqueWithoutCard_providerInput[]
    updateMany?: cardUpdateManyWithWhereWithoutCard_providerInput | cardUpdateManyWithWhereWithoutCard_providerInput[]
    deleteMany?: cardScalarWhereInput | cardScalarWhereInput[]
  }

  export type cardUncheckedUpdateManyWithoutCard_providerNestedInput = {
    create?: XOR<cardCreateWithoutCard_providerInput, cardUncheckedCreateWithoutCard_providerInput> | cardCreateWithoutCard_providerInput[] | cardUncheckedCreateWithoutCard_providerInput[]
    connectOrCreate?: cardCreateOrConnectWithoutCard_providerInput | cardCreateOrConnectWithoutCard_providerInput[]
    upsert?: cardUpsertWithWhereUniqueWithoutCard_providerInput | cardUpsertWithWhereUniqueWithoutCard_providerInput[]
    createMany?: cardCreateManyCard_providerInputEnvelope
    set?: cardWhereUniqueInput | cardWhereUniqueInput[]
    disconnect?: cardWhereUniqueInput | cardWhereUniqueInput[]
    delete?: cardWhereUniqueInput | cardWhereUniqueInput[]
    connect?: cardWhereUniqueInput | cardWhereUniqueInput[]
    update?: cardUpdateWithWhereUniqueWithoutCard_providerInput | cardUpdateWithWhereUniqueWithoutCard_providerInput[]
    updateMany?: cardUpdateManyWithWhereWithoutCard_providerInput | cardUpdateManyWithWhereWithoutCard_providerInput[]
    deleteMany?: cardScalarWhereInput | cardScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCredentialsInput = {
    create?: XOR<UserCreateWithoutCredentialsInput, UserUncheckedCreateWithoutCredentialsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCredentialsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCredentialsNestedInput = {
    create?: XOR<UserCreateWithoutCredentialsInput, UserUncheckedCreateWithoutCredentialsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCredentialsInput
    upsert?: UserUpsertWithoutCredentialsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCredentialsInput, UserUpdateWithoutCredentialsInput>, UserUncheckedUpdateWithoutCredentialsInput>
  }

  export type UserCreateNestedOneWithoutDocumentAccessAuditsInput = {
    create?: XOR<UserCreateWithoutDocumentAccessAuditsInput, UserUncheckedCreateWithoutDocumentAccessAuditsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentAccessAuditsInput
    connect?: UserWhereUniqueInput
  }

  export type document_recordCreateNestedOneWithoutDocument_access_auditInput = {
    create?: XOR<document_recordCreateWithoutDocument_access_auditInput, document_recordUncheckedCreateWithoutDocument_access_auditInput>
    connectOrCreate?: document_recordCreateOrConnectWithoutDocument_access_auditInput
    connect?: document_recordWhereUniqueInput
  }

  export type UserUpdateOneWithoutDocumentAccessAuditsNestedInput = {
    create?: XOR<UserCreateWithoutDocumentAccessAuditsInput, UserUncheckedCreateWithoutDocumentAccessAuditsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentAccessAuditsInput
    upsert?: UserUpsertWithoutDocumentAccessAuditsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDocumentAccessAuditsInput, UserUpdateWithoutDocumentAccessAuditsInput>, UserUncheckedUpdateWithoutDocumentAccessAuditsInput>
  }

  export type document_recordUpdateOneWithoutDocument_access_auditNestedInput = {
    create?: XOR<document_recordCreateWithoutDocument_access_auditInput, document_recordUncheckedCreateWithoutDocument_access_auditInput>
    connectOrCreate?: document_recordCreateOrConnectWithoutDocument_access_auditInput
    upsert?: document_recordUpsertWithoutDocument_access_auditInput
    disconnect?: document_recordWhereInput | boolean
    delete?: document_recordWhereInput | boolean
    connect?: document_recordWhereUniqueInput
    update?: XOR<XOR<document_recordUpdateToOneWithWhereWithoutDocument_access_auditInput, document_recordUpdateWithoutDocument_access_auditInput>, document_recordUncheckedUpdateWithoutDocument_access_auditInput>
  }

  export type document_recordCreateNestedOneWithoutDocument_fileInput = {
    create?: XOR<document_recordCreateWithoutDocument_fileInput, document_recordUncheckedCreateWithoutDocument_fileInput>
    connectOrCreate?: document_recordCreateOrConnectWithoutDocument_fileInput
    connect?: document_recordWhereUniqueInput
  }

  export type document_recordUpdateOneRequiredWithoutDocument_fileNestedInput = {
    create?: XOR<document_recordCreateWithoutDocument_fileInput, document_recordUncheckedCreateWithoutDocument_fileInput>
    connectOrCreate?: document_recordCreateOrConnectWithoutDocument_fileInput
    upsert?: document_recordUpsertWithoutDocument_fileInput
    connect?: document_recordWhereUniqueInput
    update?: XOR<XOR<document_recordUpdateToOneWithWhereWithoutDocument_fileInput, document_recordUpdateWithoutDocument_fileInput>, document_recordUncheckedUpdateWithoutDocument_fileInput>
  }

  export type UserCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentsInput
    connect?: UserWhereUniqueInput
  }

  export type document_access_auditCreateNestedManyWithoutDocument_recordInput = {
    create?: XOR<document_access_auditCreateWithoutDocument_recordInput, document_access_auditUncheckedCreateWithoutDocument_recordInput> | document_access_auditCreateWithoutDocument_recordInput[] | document_access_auditUncheckedCreateWithoutDocument_recordInput[]
    connectOrCreate?: document_access_auditCreateOrConnectWithoutDocument_recordInput | document_access_auditCreateOrConnectWithoutDocument_recordInput[]
    createMany?: document_access_auditCreateManyDocument_recordInputEnvelope
    connect?: document_access_auditWhereUniqueInput | document_access_auditWhereUniqueInput[]
  }

  export type document_fileCreateNestedManyWithoutDocument_recordInput = {
    create?: XOR<document_fileCreateWithoutDocument_recordInput, document_fileUncheckedCreateWithoutDocument_recordInput> | document_fileCreateWithoutDocument_recordInput[] | document_fileUncheckedCreateWithoutDocument_recordInput[]
    connectOrCreate?: document_fileCreateOrConnectWithoutDocument_recordInput | document_fileCreateOrConnectWithoutDocument_recordInput[]
    createMany?: document_fileCreateManyDocument_recordInputEnvelope
    connect?: document_fileWhereUniqueInput | document_fileWhereUniqueInput[]
  }

  export type document_access_auditUncheckedCreateNestedManyWithoutDocument_recordInput = {
    create?: XOR<document_access_auditCreateWithoutDocument_recordInput, document_access_auditUncheckedCreateWithoutDocument_recordInput> | document_access_auditCreateWithoutDocument_recordInput[] | document_access_auditUncheckedCreateWithoutDocument_recordInput[]
    connectOrCreate?: document_access_auditCreateOrConnectWithoutDocument_recordInput | document_access_auditCreateOrConnectWithoutDocument_recordInput[]
    createMany?: document_access_auditCreateManyDocument_recordInputEnvelope
    connect?: document_access_auditWhereUniqueInput | document_access_auditWhereUniqueInput[]
  }

  export type document_fileUncheckedCreateNestedManyWithoutDocument_recordInput = {
    create?: XOR<document_fileCreateWithoutDocument_recordInput, document_fileUncheckedCreateWithoutDocument_recordInput> | document_fileCreateWithoutDocument_recordInput[] | document_fileUncheckedCreateWithoutDocument_recordInput[]
    connectOrCreate?: document_fileCreateOrConnectWithoutDocument_recordInput | document_fileCreateOrConnectWithoutDocument_recordInput[]
    createMany?: document_fileCreateManyDocument_recordInputEnvelope
    connect?: document_fileWhereUniqueInput | document_fileWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentsInput
    upsert?: UserUpsertWithoutDocumentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDocumentsInput, UserUpdateWithoutDocumentsInput>, UserUncheckedUpdateWithoutDocumentsInput>
  }

  export type document_access_auditUpdateManyWithoutDocument_recordNestedInput = {
    create?: XOR<document_access_auditCreateWithoutDocument_recordInput, document_access_auditUncheckedCreateWithoutDocument_recordInput> | document_access_auditCreateWithoutDocument_recordInput[] | document_access_auditUncheckedCreateWithoutDocument_recordInput[]
    connectOrCreate?: document_access_auditCreateOrConnectWithoutDocument_recordInput | document_access_auditCreateOrConnectWithoutDocument_recordInput[]
    upsert?: document_access_auditUpsertWithWhereUniqueWithoutDocument_recordInput | document_access_auditUpsertWithWhereUniqueWithoutDocument_recordInput[]
    createMany?: document_access_auditCreateManyDocument_recordInputEnvelope
    set?: document_access_auditWhereUniqueInput | document_access_auditWhereUniqueInput[]
    disconnect?: document_access_auditWhereUniqueInput | document_access_auditWhereUniqueInput[]
    delete?: document_access_auditWhereUniqueInput | document_access_auditWhereUniqueInput[]
    connect?: document_access_auditWhereUniqueInput | document_access_auditWhereUniqueInput[]
    update?: document_access_auditUpdateWithWhereUniqueWithoutDocument_recordInput | document_access_auditUpdateWithWhereUniqueWithoutDocument_recordInput[]
    updateMany?: document_access_auditUpdateManyWithWhereWithoutDocument_recordInput | document_access_auditUpdateManyWithWhereWithoutDocument_recordInput[]
    deleteMany?: document_access_auditScalarWhereInput | document_access_auditScalarWhereInput[]
  }

  export type document_fileUpdateManyWithoutDocument_recordNestedInput = {
    create?: XOR<document_fileCreateWithoutDocument_recordInput, document_fileUncheckedCreateWithoutDocument_recordInput> | document_fileCreateWithoutDocument_recordInput[] | document_fileUncheckedCreateWithoutDocument_recordInput[]
    connectOrCreate?: document_fileCreateOrConnectWithoutDocument_recordInput | document_fileCreateOrConnectWithoutDocument_recordInput[]
    upsert?: document_fileUpsertWithWhereUniqueWithoutDocument_recordInput | document_fileUpsertWithWhereUniqueWithoutDocument_recordInput[]
    createMany?: document_fileCreateManyDocument_recordInputEnvelope
    set?: document_fileWhereUniqueInput | document_fileWhereUniqueInput[]
    disconnect?: document_fileWhereUniqueInput | document_fileWhereUniqueInput[]
    delete?: document_fileWhereUniqueInput | document_fileWhereUniqueInput[]
    connect?: document_fileWhereUniqueInput | document_fileWhereUniqueInput[]
    update?: document_fileUpdateWithWhereUniqueWithoutDocument_recordInput | document_fileUpdateWithWhereUniqueWithoutDocument_recordInput[]
    updateMany?: document_fileUpdateManyWithWhereWithoutDocument_recordInput | document_fileUpdateManyWithWhereWithoutDocument_recordInput[]
    deleteMany?: document_fileScalarWhereInput | document_fileScalarWhereInput[]
  }

  export type document_access_auditUncheckedUpdateManyWithoutDocument_recordNestedInput = {
    create?: XOR<document_access_auditCreateWithoutDocument_recordInput, document_access_auditUncheckedCreateWithoutDocument_recordInput> | document_access_auditCreateWithoutDocument_recordInput[] | document_access_auditUncheckedCreateWithoutDocument_recordInput[]
    connectOrCreate?: document_access_auditCreateOrConnectWithoutDocument_recordInput | document_access_auditCreateOrConnectWithoutDocument_recordInput[]
    upsert?: document_access_auditUpsertWithWhereUniqueWithoutDocument_recordInput | document_access_auditUpsertWithWhereUniqueWithoutDocument_recordInput[]
    createMany?: document_access_auditCreateManyDocument_recordInputEnvelope
    set?: document_access_auditWhereUniqueInput | document_access_auditWhereUniqueInput[]
    disconnect?: document_access_auditWhereUniqueInput | document_access_auditWhereUniqueInput[]
    delete?: document_access_auditWhereUniqueInput | document_access_auditWhereUniqueInput[]
    connect?: document_access_auditWhereUniqueInput | document_access_auditWhereUniqueInput[]
    update?: document_access_auditUpdateWithWhereUniqueWithoutDocument_recordInput | document_access_auditUpdateWithWhereUniqueWithoutDocument_recordInput[]
    updateMany?: document_access_auditUpdateManyWithWhereWithoutDocument_recordInput | document_access_auditUpdateManyWithWhereWithoutDocument_recordInput[]
    deleteMany?: document_access_auditScalarWhereInput | document_access_auditScalarWhereInput[]
  }

  export type document_fileUncheckedUpdateManyWithoutDocument_recordNestedInput = {
    create?: XOR<document_fileCreateWithoutDocument_recordInput, document_fileUncheckedCreateWithoutDocument_recordInput> | document_fileCreateWithoutDocument_recordInput[] | document_fileUncheckedCreateWithoutDocument_recordInput[]
    connectOrCreate?: document_fileCreateOrConnectWithoutDocument_recordInput | document_fileCreateOrConnectWithoutDocument_recordInput[]
    upsert?: document_fileUpsertWithWhereUniqueWithoutDocument_recordInput | document_fileUpsertWithWhereUniqueWithoutDocument_recordInput[]
    createMany?: document_fileCreateManyDocument_recordInputEnvelope
    set?: document_fileWhereUniqueInput | document_fileWhereUniqueInput[]
    disconnect?: document_fileWhereUniqueInput | document_fileWhereUniqueInput[]
    delete?: document_fileWhereUniqueInput | document_fileWhereUniqueInput[]
    connect?: document_fileWhereUniqueInput | document_fileWhereUniqueInput[]
    update?: document_fileUpdateWithWhereUniqueWithoutDocument_recordInput | document_fileUpdateWithWhereUniqueWithoutDocument_recordInput[]
    updateMany?: document_fileUpdateManyWithWhereWithoutDocument_recordInput | document_fileUpdateManyWithWhereWithoutDocument_recordInput[]
    deleteMany?: document_fileScalarWhereInput | document_fileScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDashboardFavoritesInput = {
    create?: XOR<UserCreateWithoutDashboardFavoritesInput, UserUncheckedCreateWithoutDashboardFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDashboardFavoritesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutDashboardFavoritesNestedInput = {
    create?: XOR<UserCreateWithoutDashboardFavoritesInput, UserUncheckedCreateWithoutDashboardFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDashboardFavoritesInput
    upsert?: UserUpsertWithoutDashboardFavoritesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDashboardFavoritesInput, UserUpdateWithoutDashboardFavoritesInput>, UserUncheckedUpdateWithoutDashboardFavoritesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    cards?: cardCreateNestedManyWithoutUserInput
    credentials?: credential_recordCreateNestedManyWithoutUserInput
    documents?: document_recordCreateNestedManyWithoutUserInput
    documentAccessAudits?: document_access_auditCreateNestedManyWithoutUserInput
    dashboardFavorites?: dashboard_favoriteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    cards?: cardUncheckedCreateNestedManyWithoutUserInput
    credentials?: credential_recordUncheckedCreateNestedManyWithoutUserInput
    documents?: document_recordUncheckedCreateNestedManyWithoutUserInput
    documentAccessAudits?: document_access_auditUncheckedCreateNestedManyWithoutUserInput
    dashboardFavorites?: dashboard_favoriteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    cards?: cardUpdateManyWithoutUserNestedInput
    credentials?: credential_recordUpdateManyWithoutUserNestedInput
    documents?: document_recordUpdateManyWithoutUserNestedInput
    documentAccessAudits?: document_access_auditUpdateManyWithoutUserNestedInput
    dashboardFavorites?: dashboard_favoriteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    cards?: cardUncheckedUpdateManyWithoutUserNestedInput
    credentials?: credential_recordUncheckedUpdateManyWithoutUserNestedInput
    documents?: document_recordUncheckedUpdateManyWithoutUserNestedInput
    documentAccessAudits?: document_access_auditUncheckedUpdateManyWithoutUserNestedInput
    dashboardFavorites?: dashboard_favoriteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    cards?: cardCreateNestedManyWithoutUserInput
    credentials?: credential_recordCreateNestedManyWithoutUserInput
    documents?: document_recordCreateNestedManyWithoutUserInput
    documentAccessAudits?: document_access_auditCreateNestedManyWithoutUserInput
    dashboardFavorites?: dashboard_favoriteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    cards?: cardUncheckedCreateNestedManyWithoutUserInput
    credentials?: credential_recordUncheckedCreateNestedManyWithoutUserInput
    documents?: document_recordUncheckedCreateNestedManyWithoutUserInput
    documentAccessAudits?: document_access_auditUncheckedCreateNestedManyWithoutUserInput
    dashboardFavorites?: dashboard_favoriteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    cards?: cardUpdateManyWithoutUserNestedInput
    credentials?: credential_recordUpdateManyWithoutUserNestedInput
    documents?: document_recordUpdateManyWithoutUserNestedInput
    documentAccessAudits?: document_access_auditUpdateManyWithoutUserNestedInput
    dashboardFavorites?: dashboard_favoriteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    cards?: cardUncheckedUpdateManyWithoutUserNestedInput
    credentials?: credential_recordUncheckedUpdateManyWithoutUserNestedInput
    documents?: document_recordUncheckedUpdateManyWithoutUserNestedInput
    documentAccessAudits?: document_access_auditUncheckedUpdateManyWithoutUserNestedInput
    dashboardFavorites?: dashboard_favoriteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
  }

  export type cardCreateWithoutUserInput = {
    id?: bigint | number
    created_at?: Date | string
    card_name?: string | null
    number: string
    cvv: string
    holder_name?: string | null
    network: number
    isCredit?: boolean | null
    expiry_month?: number
    expiry_year?: number
    color_name?: string | null
    tags?: string
    status?: string
    credit_limit?: number | null
    billing_date?: number | null
    payment_date?: number | null
    card_provider?: card_providerCreateNestedOneWithoutCardInput
  }

  export type cardUncheckedCreateWithoutUserInput = {
    id?: bigint | number
    created_at?: Date | string
    card_name?: string | null
    number: string
    cvv: string
    holder_name?: string | null
    network: number
    isCredit?: boolean | null
    expiry_month?: number
    expiry_year?: number
    color_name?: string | null
    tags?: string
    status?: string
    credit_limit?: number | null
    provider_id?: bigint | number | null
    billing_date?: number | null
    payment_date?: number | null
  }

  export type cardCreateOrConnectWithoutUserInput = {
    where: cardWhereUniqueInput
    create: XOR<cardCreateWithoutUserInput, cardUncheckedCreateWithoutUserInput>
  }

  export type cardCreateManyUserInputEnvelope = {
    data: cardCreateManyUserInput | cardCreateManyUserInput[]
  }

  export type credential_recordCreateWithoutUserInput = {
    id?: string
    credential_type: string
    service_name: string
    identifier?: string | null
    secret_token: string
    secret_hash: string
    secret_last4: string
    masked_secret: string
    url?: string | null
    notes?: string | null
    metadata?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type credential_recordUncheckedCreateWithoutUserInput = {
    id?: string
    credential_type: string
    service_name: string
    identifier?: string | null
    secret_token: string
    secret_hash: string
    secret_last4: string
    masked_secret: string
    url?: string | null
    notes?: string | null
    metadata?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type credential_recordCreateOrConnectWithoutUserInput = {
    where: credential_recordWhereUniqueInput
    create: XOR<credential_recordCreateWithoutUserInput, credential_recordUncheckedCreateWithoutUserInput>
  }

  export type credential_recordCreateManyUserInputEnvelope = {
    data: credential_recordCreateManyUserInput | credential_recordCreateManyUserInput[]
  }

  export type document_recordCreateWithoutUserInput = {
    id?: string
    document_type: string
    document_number_token: string
    document_number_last4: string
    document_number_hash: string
    masked_number: string
    name_on_document?: string | null
    metadata?: string | null
    verified_at?: Date | string | null
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    category?: string | null
    document_access_audit?: document_access_auditCreateNestedManyWithoutDocument_recordInput
    document_file?: document_fileCreateNestedManyWithoutDocument_recordInput
  }

  export type document_recordUncheckedCreateWithoutUserInput = {
    id?: string
    document_type: string
    document_number_token: string
    document_number_last4: string
    document_number_hash: string
    masked_number: string
    name_on_document?: string | null
    metadata?: string | null
    verified_at?: Date | string | null
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    category?: string | null
    document_access_audit?: document_access_auditUncheckedCreateNestedManyWithoutDocument_recordInput
    document_file?: document_fileUncheckedCreateNestedManyWithoutDocument_recordInput
  }

  export type document_recordCreateOrConnectWithoutUserInput = {
    where: document_recordWhereUniqueInput
    create: XOR<document_recordCreateWithoutUserInput, document_recordUncheckedCreateWithoutUserInput>
  }

  export type document_recordCreateManyUserInputEnvelope = {
    data: document_recordCreateManyUserInput | document_recordCreateManyUserInput[]
  }

  export type document_access_auditCreateWithoutUserInput = {
    id?: bigint | number
    action: string
    context?: string | null
    created_at?: Date | string
    document_record?: document_recordCreateNestedOneWithoutDocument_access_auditInput
  }

  export type document_access_auditUncheckedCreateWithoutUserInput = {
    id?: bigint | number
    document_id?: string | null
    action: string
    context?: string | null
    created_at?: Date | string
  }

  export type document_access_auditCreateOrConnectWithoutUserInput = {
    where: document_access_auditWhereUniqueInput
    create: XOR<document_access_auditCreateWithoutUserInput, document_access_auditUncheckedCreateWithoutUserInput>
  }

  export type document_access_auditCreateManyUserInputEnvelope = {
    data: document_access_auditCreateManyUserInput | document_access_auditCreateManyUserInput[]
  }

  export type dashboard_favoriteCreateWithoutUserInput = {
    id?: bigint | number
    feature_key: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type dashboard_favoriteUncheckedCreateWithoutUserInput = {
    id?: bigint | number
    feature_key: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type dashboard_favoriteCreateOrConnectWithoutUserInput = {
    where: dashboard_favoriteWhereUniqueInput
    create: XOR<dashboard_favoriteCreateWithoutUserInput, dashboard_favoriteUncheckedCreateWithoutUserInput>
  }

  export type dashboard_favoriteCreateManyUserInputEnvelope = {
    data: dashboard_favoriteCreateManyUserInput | dashboard_favoriteCreateManyUserInput[]
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type cardUpsertWithWhereUniqueWithoutUserInput = {
    where: cardWhereUniqueInput
    update: XOR<cardUpdateWithoutUserInput, cardUncheckedUpdateWithoutUserInput>
    create: XOR<cardCreateWithoutUserInput, cardUncheckedCreateWithoutUserInput>
  }

  export type cardUpdateWithWhereUniqueWithoutUserInput = {
    where: cardWhereUniqueInput
    data: XOR<cardUpdateWithoutUserInput, cardUncheckedUpdateWithoutUserInput>
  }

  export type cardUpdateManyWithWhereWithoutUserInput = {
    where: cardScalarWhereInput
    data: XOR<cardUpdateManyMutationInput, cardUncheckedUpdateManyWithoutUserInput>
  }

  export type cardScalarWhereInput = {
    AND?: cardScalarWhereInput | cardScalarWhereInput[]
    OR?: cardScalarWhereInput[]
    NOT?: cardScalarWhereInput | cardScalarWhereInput[]
    id?: BigIntFilter<"card"> | bigint | number
    created_at?: DateTimeFilter<"card"> | Date | string
    card_name?: StringNullableFilter<"card"> | string | null
    number?: StringFilter<"card"> | string
    cvv?: StringFilter<"card"> | string
    holder_name?: StringNullableFilter<"card"> | string | null
    network?: IntFilter<"card"> | number
    isCredit?: BoolNullableFilter<"card"> | boolean | null
    expiry_month?: IntFilter<"card"> | number
    expiry_year?: IntFilter<"card"> | number
    owner_id?: StringFilter<"card"> | string
    color_name?: StringNullableFilter<"card"> | string | null
    tags?: StringFilter<"card"> | string
    status?: StringFilter<"card"> | string
    credit_limit?: FloatNullableFilter<"card"> | number | null
    provider_id?: BigIntNullableFilter<"card"> | bigint | number | null
    billing_date?: IntNullableFilter<"card"> | number | null
    payment_date?: IntNullableFilter<"card"> | number | null
  }

  export type credential_recordUpsertWithWhereUniqueWithoutUserInput = {
    where: credential_recordWhereUniqueInput
    update: XOR<credential_recordUpdateWithoutUserInput, credential_recordUncheckedUpdateWithoutUserInput>
    create: XOR<credential_recordCreateWithoutUserInput, credential_recordUncheckedCreateWithoutUserInput>
  }

  export type credential_recordUpdateWithWhereUniqueWithoutUserInput = {
    where: credential_recordWhereUniqueInput
    data: XOR<credential_recordUpdateWithoutUserInput, credential_recordUncheckedUpdateWithoutUserInput>
  }

  export type credential_recordUpdateManyWithWhereWithoutUserInput = {
    where: credential_recordScalarWhereInput
    data: XOR<credential_recordUpdateManyMutationInput, credential_recordUncheckedUpdateManyWithoutUserInput>
  }

  export type credential_recordScalarWhereInput = {
    AND?: credential_recordScalarWhereInput | credential_recordScalarWhereInput[]
    OR?: credential_recordScalarWhereInput[]
    NOT?: credential_recordScalarWhereInput | credential_recordScalarWhereInput[]
    id?: StringFilter<"credential_record"> | string
    user_id?: StringFilter<"credential_record"> | string
    credential_type?: StringFilter<"credential_record"> | string
    service_name?: StringFilter<"credential_record"> | string
    identifier?: StringNullableFilter<"credential_record"> | string | null
    secret_token?: StringFilter<"credential_record"> | string
    secret_hash?: StringFilter<"credential_record"> | string
    secret_last4?: StringFilter<"credential_record"> | string
    masked_secret?: StringFilter<"credential_record"> | string
    url?: StringNullableFilter<"credential_record"> | string | null
    notes?: StringNullableFilter<"credential_record"> | string | null
    metadata?: StringNullableFilter<"credential_record"> | string | null
    created_at?: DateTimeFilter<"credential_record"> | Date | string
    updated_at?: DateTimeFilter<"credential_record"> | Date | string
  }

  export type document_recordUpsertWithWhereUniqueWithoutUserInput = {
    where: document_recordWhereUniqueInput
    update: XOR<document_recordUpdateWithoutUserInput, document_recordUncheckedUpdateWithoutUserInput>
    create: XOR<document_recordCreateWithoutUserInput, document_recordUncheckedCreateWithoutUserInput>
  }

  export type document_recordUpdateWithWhereUniqueWithoutUserInput = {
    where: document_recordWhereUniqueInput
    data: XOR<document_recordUpdateWithoutUserInput, document_recordUncheckedUpdateWithoutUserInput>
  }

  export type document_recordUpdateManyWithWhereWithoutUserInput = {
    where: document_recordScalarWhereInput
    data: XOR<document_recordUpdateManyMutationInput, document_recordUncheckedUpdateManyWithoutUserInput>
  }

  export type document_recordScalarWhereInput = {
    AND?: document_recordScalarWhereInput | document_recordScalarWhereInput[]
    OR?: document_recordScalarWhereInput[]
    NOT?: document_recordScalarWhereInput | document_recordScalarWhereInput[]
    id?: StringFilter<"document_record"> | string
    user_id?: StringFilter<"document_record"> | string
    document_type?: StringFilter<"document_record"> | string
    document_number_token?: StringFilter<"document_record"> | string
    document_number_last4?: StringFilter<"document_record"> | string
    document_number_hash?: StringFilter<"document_record"> | string
    masked_number?: StringFilter<"document_record"> | string
    name_on_document?: StringNullableFilter<"document_record"> | string | null
    metadata?: StringNullableFilter<"document_record"> | string | null
    verified_at?: DateTimeNullableFilter<"document_record"> | Date | string | null
    expires_at?: DateTimeNullableFilter<"document_record"> | Date | string | null
    created_at?: DateTimeFilter<"document_record"> | Date | string
    updated_at?: DateTimeFilter<"document_record"> | Date | string
    category?: StringNullableFilter<"document_record"> | string | null
  }

  export type document_access_auditUpsertWithWhereUniqueWithoutUserInput = {
    where: document_access_auditWhereUniqueInput
    update: XOR<document_access_auditUpdateWithoutUserInput, document_access_auditUncheckedUpdateWithoutUserInput>
    create: XOR<document_access_auditCreateWithoutUserInput, document_access_auditUncheckedCreateWithoutUserInput>
  }

  export type document_access_auditUpdateWithWhereUniqueWithoutUserInput = {
    where: document_access_auditWhereUniqueInput
    data: XOR<document_access_auditUpdateWithoutUserInput, document_access_auditUncheckedUpdateWithoutUserInput>
  }

  export type document_access_auditUpdateManyWithWhereWithoutUserInput = {
    where: document_access_auditScalarWhereInput
    data: XOR<document_access_auditUpdateManyMutationInput, document_access_auditUncheckedUpdateManyWithoutUserInput>
  }

  export type document_access_auditScalarWhereInput = {
    AND?: document_access_auditScalarWhereInput | document_access_auditScalarWhereInput[]
    OR?: document_access_auditScalarWhereInput[]
    NOT?: document_access_auditScalarWhereInput | document_access_auditScalarWhereInput[]
    id?: BigIntFilter<"document_access_audit"> | bigint | number
    document_id?: StringNullableFilter<"document_access_audit"> | string | null
    actor_user_id?: StringNullableFilter<"document_access_audit"> | string | null
    action?: StringFilter<"document_access_audit"> | string
    context?: StringNullableFilter<"document_access_audit"> | string | null
    created_at?: DateTimeFilter<"document_access_audit"> | Date | string
  }

  export type dashboard_favoriteUpsertWithWhereUniqueWithoutUserInput = {
    where: dashboard_favoriteWhereUniqueInput
    update: XOR<dashboard_favoriteUpdateWithoutUserInput, dashboard_favoriteUncheckedUpdateWithoutUserInput>
    create: XOR<dashboard_favoriteCreateWithoutUserInput, dashboard_favoriteUncheckedCreateWithoutUserInput>
  }

  export type dashboard_favoriteUpdateWithWhereUniqueWithoutUserInput = {
    where: dashboard_favoriteWhereUniqueInput
    data: XOR<dashboard_favoriteUpdateWithoutUserInput, dashboard_favoriteUncheckedUpdateWithoutUserInput>
  }

  export type dashboard_favoriteUpdateManyWithWhereWithoutUserInput = {
    where: dashboard_favoriteScalarWhereInput
    data: XOR<dashboard_favoriteUpdateManyMutationInput, dashboard_favoriteUncheckedUpdateManyWithoutUserInput>
  }

  export type dashboard_favoriteScalarWhereInput = {
    AND?: dashboard_favoriteScalarWhereInput | dashboard_favoriteScalarWhereInput[]
    OR?: dashboard_favoriteScalarWhereInput[]
    NOT?: dashboard_favoriteScalarWhereInput | dashboard_favoriteScalarWhereInput[]
    id?: BigIntFilter<"dashboard_favorite"> | bigint | number
    user_id?: StringFilter<"dashboard_favorite"> | string
    feature_key?: StringFilter<"dashboard_favorite"> | string
    created_at?: DateTimeFilter<"dashboard_favorite"> | Date | string
    updated_at?: DateTimeFilter<"dashboard_favorite"> | Date | string
  }

  export type UserCreateWithoutCardsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    credentials?: credential_recordCreateNestedManyWithoutUserInput
    documents?: document_recordCreateNestedManyWithoutUserInput
    documentAccessAudits?: document_access_auditCreateNestedManyWithoutUserInput
    dashboardFavorites?: dashboard_favoriteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCardsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    credentials?: credential_recordUncheckedCreateNestedManyWithoutUserInput
    documents?: document_recordUncheckedCreateNestedManyWithoutUserInput
    documentAccessAudits?: document_access_auditUncheckedCreateNestedManyWithoutUserInput
    dashboardFavorites?: dashboard_favoriteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCardsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCardsInput, UserUncheckedCreateWithoutCardsInput>
  }

  export type card_providerCreateWithoutCardInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type card_providerUncheckedCreateWithoutCardInput = {
    id?: bigint | number
    name: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type card_providerCreateOrConnectWithoutCardInput = {
    where: card_providerWhereUniqueInput
    create: XOR<card_providerCreateWithoutCardInput, card_providerUncheckedCreateWithoutCardInput>
  }

  export type UserUpsertWithoutCardsInput = {
    update: XOR<UserUpdateWithoutCardsInput, UserUncheckedUpdateWithoutCardsInput>
    create: XOR<UserCreateWithoutCardsInput, UserUncheckedCreateWithoutCardsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCardsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCardsInput, UserUncheckedUpdateWithoutCardsInput>
  }

  export type UserUpdateWithoutCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    credentials?: credential_recordUpdateManyWithoutUserNestedInput
    documents?: document_recordUpdateManyWithoutUserNestedInput
    documentAccessAudits?: document_access_auditUpdateManyWithoutUserNestedInput
    dashboardFavorites?: dashboard_favoriteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    credentials?: credential_recordUncheckedUpdateManyWithoutUserNestedInput
    documents?: document_recordUncheckedUpdateManyWithoutUserNestedInput
    documentAccessAudits?: document_access_auditUncheckedUpdateManyWithoutUserNestedInput
    dashboardFavorites?: dashboard_favoriteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type card_providerUpsertWithoutCardInput = {
    update: XOR<card_providerUpdateWithoutCardInput, card_providerUncheckedUpdateWithoutCardInput>
    create: XOR<card_providerCreateWithoutCardInput, card_providerUncheckedCreateWithoutCardInput>
    where?: card_providerWhereInput
  }

  export type card_providerUpdateToOneWithWhereWithoutCardInput = {
    where?: card_providerWhereInput
    data: XOR<card_providerUpdateWithoutCardInput, card_providerUncheckedUpdateWithoutCardInput>
  }

  export type card_providerUpdateWithoutCardInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type card_providerUncheckedUpdateWithoutCardInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cardCreateWithoutCard_providerInput = {
    id?: bigint | number
    created_at?: Date | string
    card_name?: string | null
    number: string
    cvv: string
    holder_name?: string | null
    network: number
    isCredit?: boolean | null
    expiry_month?: number
    expiry_year?: number
    color_name?: string | null
    tags?: string
    status?: string
    credit_limit?: number | null
    billing_date?: number | null
    payment_date?: number | null
    user: UserCreateNestedOneWithoutCardsInput
  }

  export type cardUncheckedCreateWithoutCard_providerInput = {
    id?: bigint | number
    created_at?: Date | string
    card_name?: string | null
    number: string
    cvv: string
    holder_name?: string | null
    network: number
    isCredit?: boolean | null
    expiry_month?: number
    expiry_year?: number
    owner_id: string
    color_name?: string | null
    tags?: string
    status?: string
    credit_limit?: number | null
    billing_date?: number | null
    payment_date?: number | null
  }

  export type cardCreateOrConnectWithoutCard_providerInput = {
    where: cardWhereUniqueInput
    create: XOR<cardCreateWithoutCard_providerInput, cardUncheckedCreateWithoutCard_providerInput>
  }

  export type cardCreateManyCard_providerInputEnvelope = {
    data: cardCreateManyCard_providerInput | cardCreateManyCard_providerInput[]
  }

  export type cardUpsertWithWhereUniqueWithoutCard_providerInput = {
    where: cardWhereUniqueInput
    update: XOR<cardUpdateWithoutCard_providerInput, cardUncheckedUpdateWithoutCard_providerInput>
    create: XOR<cardCreateWithoutCard_providerInput, cardUncheckedCreateWithoutCard_providerInput>
  }

  export type cardUpdateWithWhereUniqueWithoutCard_providerInput = {
    where: cardWhereUniqueInput
    data: XOR<cardUpdateWithoutCard_providerInput, cardUncheckedUpdateWithoutCard_providerInput>
  }

  export type cardUpdateManyWithWhereWithoutCard_providerInput = {
    where: cardScalarWhereInput
    data: XOR<cardUpdateManyMutationInput, cardUncheckedUpdateManyWithoutCard_providerInput>
  }

  export type UserCreateWithoutCredentialsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    cards?: cardCreateNestedManyWithoutUserInput
    documents?: document_recordCreateNestedManyWithoutUserInput
    documentAccessAudits?: document_access_auditCreateNestedManyWithoutUserInput
    dashboardFavorites?: dashboard_favoriteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCredentialsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    cards?: cardUncheckedCreateNestedManyWithoutUserInput
    documents?: document_recordUncheckedCreateNestedManyWithoutUserInput
    documentAccessAudits?: document_access_auditUncheckedCreateNestedManyWithoutUserInput
    dashboardFavorites?: dashboard_favoriteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCredentialsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCredentialsInput, UserUncheckedCreateWithoutCredentialsInput>
  }

  export type UserUpsertWithoutCredentialsInput = {
    update: XOR<UserUpdateWithoutCredentialsInput, UserUncheckedUpdateWithoutCredentialsInput>
    create: XOR<UserCreateWithoutCredentialsInput, UserUncheckedCreateWithoutCredentialsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCredentialsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCredentialsInput, UserUncheckedUpdateWithoutCredentialsInput>
  }

  export type UserUpdateWithoutCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    cards?: cardUpdateManyWithoutUserNestedInput
    documents?: document_recordUpdateManyWithoutUserNestedInput
    documentAccessAudits?: document_access_auditUpdateManyWithoutUserNestedInput
    dashboardFavorites?: dashboard_favoriteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    cards?: cardUncheckedUpdateManyWithoutUserNestedInput
    documents?: document_recordUncheckedUpdateManyWithoutUserNestedInput
    documentAccessAudits?: document_access_auditUncheckedUpdateManyWithoutUserNestedInput
    dashboardFavorites?: dashboard_favoriteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutDocumentAccessAuditsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    cards?: cardCreateNestedManyWithoutUserInput
    credentials?: credential_recordCreateNestedManyWithoutUserInput
    documents?: document_recordCreateNestedManyWithoutUserInput
    dashboardFavorites?: dashboard_favoriteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDocumentAccessAuditsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    cards?: cardUncheckedCreateNestedManyWithoutUserInput
    credentials?: credential_recordUncheckedCreateNestedManyWithoutUserInput
    documents?: document_recordUncheckedCreateNestedManyWithoutUserInput
    dashboardFavorites?: dashboard_favoriteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDocumentAccessAuditsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDocumentAccessAuditsInput, UserUncheckedCreateWithoutDocumentAccessAuditsInput>
  }

  export type document_recordCreateWithoutDocument_access_auditInput = {
    id?: string
    document_type: string
    document_number_token: string
    document_number_last4: string
    document_number_hash: string
    masked_number: string
    name_on_document?: string | null
    metadata?: string | null
    verified_at?: Date | string | null
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    category?: string | null
    user: UserCreateNestedOneWithoutDocumentsInput
    document_file?: document_fileCreateNestedManyWithoutDocument_recordInput
  }

  export type document_recordUncheckedCreateWithoutDocument_access_auditInput = {
    id?: string
    user_id: string
    document_type: string
    document_number_token: string
    document_number_last4: string
    document_number_hash: string
    masked_number: string
    name_on_document?: string | null
    metadata?: string | null
    verified_at?: Date | string | null
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    category?: string | null
    document_file?: document_fileUncheckedCreateNestedManyWithoutDocument_recordInput
  }

  export type document_recordCreateOrConnectWithoutDocument_access_auditInput = {
    where: document_recordWhereUniqueInput
    create: XOR<document_recordCreateWithoutDocument_access_auditInput, document_recordUncheckedCreateWithoutDocument_access_auditInput>
  }

  export type UserUpsertWithoutDocumentAccessAuditsInput = {
    update: XOR<UserUpdateWithoutDocumentAccessAuditsInput, UserUncheckedUpdateWithoutDocumentAccessAuditsInput>
    create: XOR<UserCreateWithoutDocumentAccessAuditsInput, UserUncheckedCreateWithoutDocumentAccessAuditsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDocumentAccessAuditsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDocumentAccessAuditsInput, UserUncheckedUpdateWithoutDocumentAccessAuditsInput>
  }

  export type UserUpdateWithoutDocumentAccessAuditsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    cards?: cardUpdateManyWithoutUserNestedInput
    credentials?: credential_recordUpdateManyWithoutUserNestedInput
    documents?: document_recordUpdateManyWithoutUserNestedInput
    dashboardFavorites?: dashboard_favoriteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDocumentAccessAuditsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    cards?: cardUncheckedUpdateManyWithoutUserNestedInput
    credentials?: credential_recordUncheckedUpdateManyWithoutUserNestedInput
    documents?: document_recordUncheckedUpdateManyWithoutUserNestedInput
    dashboardFavorites?: dashboard_favoriteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type document_recordUpsertWithoutDocument_access_auditInput = {
    update: XOR<document_recordUpdateWithoutDocument_access_auditInput, document_recordUncheckedUpdateWithoutDocument_access_auditInput>
    create: XOR<document_recordCreateWithoutDocument_access_auditInput, document_recordUncheckedCreateWithoutDocument_access_auditInput>
    where?: document_recordWhereInput
  }

  export type document_recordUpdateToOneWithWhereWithoutDocument_access_auditInput = {
    where?: document_recordWhereInput
    data: XOR<document_recordUpdateWithoutDocument_access_auditInput, document_recordUncheckedUpdateWithoutDocument_access_auditInput>
  }

  export type document_recordUpdateWithoutDocument_access_auditInput = {
    id?: StringFieldUpdateOperationsInput | string
    document_type?: StringFieldUpdateOperationsInput | string
    document_number_token?: StringFieldUpdateOperationsInput | string
    document_number_last4?: StringFieldUpdateOperationsInput | string
    document_number_hash?: StringFieldUpdateOperationsInput | string
    masked_number?: StringFieldUpdateOperationsInput | string
    name_on_document?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutDocumentsNestedInput
    document_file?: document_fileUpdateManyWithoutDocument_recordNestedInput
  }

  export type document_recordUncheckedUpdateWithoutDocument_access_auditInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    document_type?: StringFieldUpdateOperationsInput | string
    document_number_token?: StringFieldUpdateOperationsInput | string
    document_number_last4?: StringFieldUpdateOperationsInput | string
    document_number_hash?: StringFieldUpdateOperationsInput | string
    masked_number?: StringFieldUpdateOperationsInput | string
    name_on_document?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    document_file?: document_fileUncheckedUpdateManyWithoutDocument_recordNestedInput
  }

  export type document_recordCreateWithoutDocument_fileInput = {
    id?: string
    document_type: string
    document_number_token: string
    document_number_last4: string
    document_number_hash: string
    masked_number: string
    name_on_document?: string | null
    metadata?: string | null
    verified_at?: Date | string | null
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    category?: string | null
    user: UserCreateNestedOneWithoutDocumentsInput
    document_access_audit?: document_access_auditCreateNestedManyWithoutDocument_recordInput
  }

  export type document_recordUncheckedCreateWithoutDocument_fileInput = {
    id?: string
    user_id: string
    document_type: string
    document_number_token: string
    document_number_last4: string
    document_number_hash: string
    masked_number: string
    name_on_document?: string | null
    metadata?: string | null
    verified_at?: Date | string | null
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    category?: string | null
    document_access_audit?: document_access_auditUncheckedCreateNestedManyWithoutDocument_recordInput
  }

  export type document_recordCreateOrConnectWithoutDocument_fileInput = {
    where: document_recordWhereUniqueInput
    create: XOR<document_recordCreateWithoutDocument_fileInput, document_recordUncheckedCreateWithoutDocument_fileInput>
  }

  export type document_recordUpsertWithoutDocument_fileInput = {
    update: XOR<document_recordUpdateWithoutDocument_fileInput, document_recordUncheckedUpdateWithoutDocument_fileInput>
    create: XOR<document_recordCreateWithoutDocument_fileInput, document_recordUncheckedCreateWithoutDocument_fileInput>
    where?: document_recordWhereInput
  }

  export type document_recordUpdateToOneWithWhereWithoutDocument_fileInput = {
    where?: document_recordWhereInput
    data: XOR<document_recordUpdateWithoutDocument_fileInput, document_recordUncheckedUpdateWithoutDocument_fileInput>
  }

  export type document_recordUpdateWithoutDocument_fileInput = {
    id?: StringFieldUpdateOperationsInput | string
    document_type?: StringFieldUpdateOperationsInput | string
    document_number_token?: StringFieldUpdateOperationsInput | string
    document_number_last4?: StringFieldUpdateOperationsInput | string
    document_number_hash?: StringFieldUpdateOperationsInput | string
    masked_number?: StringFieldUpdateOperationsInput | string
    name_on_document?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutDocumentsNestedInput
    document_access_audit?: document_access_auditUpdateManyWithoutDocument_recordNestedInput
  }

  export type document_recordUncheckedUpdateWithoutDocument_fileInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    document_type?: StringFieldUpdateOperationsInput | string
    document_number_token?: StringFieldUpdateOperationsInput | string
    document_number_last4?: StringFieldUpdateOperationsInput | string
    document_number_hash?: StringFieldUpdateOperationsInput | string
    masked_number?: StringFieldUpdateOperationsInput | string
    name_on_document?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    document_access_audit?: document_access_auditUncheckedUpdateManyWithoutDocument_recordNestedInput
  }

  export type UserCreateWithoutDocumentsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    cards?: cardCreateNestedManyWithoutUserInput
    credentials?: credential_recordCreateNestedManyWithoutUserInput
    documentAccessAudits?: document_access_auditCreateNestedManyWithoutUserInput
    dashboardFavorites?: dashboard_favoriteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDocumentsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    cards?: cardUncheckedCreateNestedManyWithoutUserInput
    credentials?: credential_recordUncheckedCreateNestedManyWithoutUserInput
    documentAccessAudits?: document_access_auditUncheckedCreateNestedManyWithoutUserInput
    dashboardFavorites?: dashboard_favoriteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDocumentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
  }

  export type document_access_auditCreateWithoutDocument_recordInput = {
    id?: bigint | number
    action: string
    context?: string | null
    created_at?: Date | string
    user?: UserCreateNestedOneWithoutDocumentAccessAuditsInput
  }

  export type document_access_auditUncheckedCreateWithoutDocument_recordInput = {
    id?: bigint | number
    actor_user_id?: string | null
    action: string
    context?: string | null
    created_at?: Date | string
  }

  export type document_access_auditCreateOrConnectWithoutDocument_recordInput = {
    where: document_access_auditWhereUniqueInput
    create: XOR<document_access_auditCreateWithoutDocument_recordInput, document_access_auditUncheckedCreateWithoutDocument_recordInput>
  }

  export type document_access_auditCreateManyDocument_recordInputEnvelope = {
    data: document_access_auditCreateManyDocument_recordInput | document_access_auditCreateManyDocument_recordInput[]
  }

  export type document_fileCreateWithoutDocument_recordInput = {
    id?: string
    file_path: string
    file_side?: string
    mime_type?: string | null
    size_bytes?: bigint | number | null
    created_at?: Date | string
  }

  export type document_fileUncheckedCreateWithoutDocument_recordInput = {
    id?: string
    file_path: string
    file_side?: string
    mime_type?: string | null
    size_bytes?: bigint | number | null
    created_at?: Date | string
  }

  export type document_fileCreateOrConnectWithoutDocument_recordInput = {
    where: document_fileWhereUniqueInput
    create: XOR<document_fileCreateWithoutDocument_recordInput, document_fileUncheckedCreateWithoutDocument_recordInput>
  }

  export type document_fileCreateManyDocument_recordInputEnvelope = {
    data: document_fileCreateManyDocument_recordInput | document_fileCreateManyDocument_recordInput[]
  }

  export type UserUpsertWithoutDocumentsInput = {
    update: XOR<UserUpdateWithoutDocumentsInput, UserUncheckedUpdateWithoutDocumentsInput>
    create: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDocumentsInput, UserUncheckedUpdateWithoutDocumentsInput>
  }

  export type UserUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    cards?: cardUpdateManyWithoutUserNestedInput
    credentials?: credential_recordUpdateManyWithoutUserNestedInput
    documentAccessAudits?: document_access_auditUpdateManyWithoutUserNestedInput
    dashboardFavorites?: dashboard_favoriteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    cards?: cardUncheckedUpdateManyWithoutUserNestedInput
    credentials?: credential_recordUncheckedUpdateManyWithoutUserNestedInput
    documentAccessAudits?: document_access_auditUncheckedUpdateManyWithoutUserNestedInput
    dashboardFavorites?: dashboard_favoriteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type document_access_auditUpsertWithWhereUniqueWithoutDocument_recordInput = {
    where: document_access_auditWhereUniqueInput
    update: XOR<document_access_auditUpdateWithoutDocument_recordInput, document_access_auditUncheckedUpdateWithoutDocument_recordInput>
    create: XOR<document_access_auditCreateWithoutDocument_recordInput, document_access_auditUncheckedCreateWithoutDocument_recordInput>
  }

  export type document_access_auditUpdateWithWhereUniqueWithoutDocument_recordInput = {
    where: document_access_auditWhereUniqueInput
    data: XOR<document_access_auditUpdateWithoutDocument_recordInput, document_access_auditUncheckedUpdateWithoutDocument_recordInput>
  }

  export type document_access_auditUpdateManyWithWhereWithoutDocument_recordInput = {
    where: document_access_auditScalarWhereInput
    data: XOR<document_access_auditUpdateManyMutationInput, document_access_auditUncheckedUpdateManyWithoutDocument_recordInput>
  }

  export type document_fileUpsertWithWhereUniqueWithoutDocument_recordInput = {
    where: document_fileWhereUniqueInput
    update: XOR<document_fileUpdateWithoutDocument_recordInput, document_fileUncheckedUpdateWithoutDocument_recordInput>
    create: XOR<document_fileCreateWithoutDocument_recordInput, document_fileUncheckedCreateWithoutDocument_recordInput>
  }

  export type document_fileUpdateWithWhereUniqueWithoutDocument_recordInput = {
    where: document_fileWhereUniqueInput
    data: XOR<document_fileUpdateWithoutDocument_recordInput, document_fileUncheckedUpdateWithoutDocument_recordInput>
  }

  export type document_fileUpdateManyWithWhereWithoutDocument_recordInput = {
    where: document_fileScalarWhereInput
    data: XOR<document_fileUpdateManyMutationInput, document_fileUncheckedUpdateManyWithoutDocument_recordInput>
  }

  export type document_fileScalarWhereInput = {
    AND?: document_fileScalarWhereInput | document_fileScalarWhereInput[]
    OR?: document_fileScalarWhereInput[]
    NOT?: document_fileScalarWhereInput | document_fileScalarWhereInput[]
    id?: StringFilter<"document_file"> | string
    document_id?: StringFilter<"document_file"> | string
    file_path?: StringFilter<"document_file"> | string
    file_side?: StringFilter<"document_file"> | string
    mime_type?: StringNullableFilter<"document_file"> | string | null
    size_bytes?: BigIntNullableFilter<"document_file"> | bigint | number | null
    created_at?: DateTimeFilter<"document_file"> | Date | string
  }

  export type UserCreateWithoutDashboardFavoritesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    cards?: cardCreateNestedManyWithoutUserInput
    credentials?: credential_recordCreateNestedManyWithoutUserInput
    documents?: document_recordCreateNestedManyWithoutUserInput
    documentAccessAudits?: document_access_auditCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDashboardFavoritesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    cards?: cardUncheckedCreateNestedManyWithoutUserInput
    credentials?: credential_recordUncheckedCreateNestedManyWithoutUserInput
    documents?: document_recordUncheckedCreateNestedManyWithoutUserInput
    documentAccessAudits?: document_access_auditUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDashboardFavoritesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDashboardFavoritesInput, UserUncheckedCreateWithoutDashboardFavoritesInput>
  }

  export type UserUpsertWithoutDashboardFavoritesInput = {
    update: XOR<UserUpdateWithoutDashboardFavoritesInput, UserUncheckedUpdateWithoutDashboardFavoritesInput>
    create: XOR<UserCreateWithoutDashboardFavoritesInput, UserUncheckedCreateWithoutDashboardFavoritesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDashboardFavoritesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDashboardFavoritesInput, UserUncheckedUpdateWithoutDashboardFavoritesInput>
  }

  export type UserUpdateWithoutDashboardFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    cards?: cardUpdateManyWithoutUserNestedInput
    credentials?: credential_recordUpdateManyWithoutUserNestedInput
    documents?: document_recordUpdateManyWithoutUserNestedInput
    documentAccessAudits?: document_access_auditUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDashboardFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    cards?: cardUncheckedUpdateManyWithoutUserNestedInput
    credentials?: credential_recordUncheckedUpdateManyWithoutUserNestedInput
    documents?: document_recordUncheckedUpdateManyWithoutUserNestedInput
    documentAccessAudits?: document_access_auditUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type cardCreateManyUserInput = {
    id?: bigint | number
    created_at?: Date | string
    card_name?: string | null
    number: string
    cvv: string
    holder_name?: string | null
    network: number
    isCredit?: boolean | null
    expiry_month?: number
    expiry_year?: number
    color_name?: string | null
    tags?: string
    status?: string
    credit_limit?: number | null
    provider_id?: bigint | number | null
    billing_date?: number | null
    payment_date?: number | null
  }

  export type credential_recordCreateManyUserInput = {
    id?: string
    credential_type: string
    service_name: string
    identifier?: string | null
    secret_token: string
    secret_hash: string
    secret_last4: string
    masked_secret: string
    url?: string | null
    notes?: string | null
    metadata?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type document_recordCreateManyUserInput = {
    id?: string
    document_type: string
    document_number_token: string
    document_number_last4: string
    document_number_hash: string
    masked_number: string
    name_on_document?: string | null
    metadata?: string | null
    verified_at?: Date | string | null
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    category?: string | null
  }

  export type document_access_auditCreateManyUserInput = {
    id?: bigint | number
    document_id?: string | null
    action: string
    context?: string | null
    created_at?: Date | string
  }

  export type dashboard_favoriteCreateManyUserInput = {
    id?: bigint | number
    feature_key: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cardUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    card_name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: StringFieldUpdateOperationsInput | string
    cvv?: StringFieldUpdateOperationsInput | string
    holder_name?: NullableStringFieldUpdateOperationsInput | string | null
    network?: IntFieldUpdateOperationsInput | number
    isCredit?: NullableBoolFieldUpdateOperationsInput | boolean | null
    expiry_month?: IntFieldUpdateOperationsInput | number
    expiry_year?: IntFieldUpdateOperationsInput | number
    color_name?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credit_limit?: NullableFloatFieldUpdateOperationsInput | number | null
    billing_date?: NullableIntFieldUpdateOperationsInput | number | null
    payment_date?: NullableIntFieldUpdateOperationsInput | number | null
    card_provider?: card_providerUpdateOneWithoutCardNestedInput
  }

  export type cardUncheckedUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    card_name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: StringFieldUpdateOperationsInput | string
    cvv?: StringFieldUpdateOperationsInput | string
    holder_name?: NullableStringFieldUpdateOperationsInput | string | null
    network?: IntFieldUpdateOperationsInput | number
    isCredit?: NullableBoolFieldUpdateOperationsInput | boolean | null
    expiry_month?: IntFieldUpdateOperationsInput | number
    expiry_year?: IntFieldUpdateOperationsInput | number
    color_name?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credit_limit?: NullableFloatFieldUpdateOperationsInput | number | null
    provider_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    billing_date?: NullableIntFieldUpdateOperationsInput | number | null
    payment_date?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type cardUncheckedUpdateManyWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    card_name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: StringFieldUpdateOperationsInput | string
    cvv?: StringFieldUpdateOperationsInput | string
    holder_name?: NullableStringFieldUpdateOperationsInput | string | null
    network?: IntFieldUpdateOperationsInput | number
    isCredit?: NullableBoolFieldUpdateOperationsInput | boolean | null
    expiry_month?: IntFieldUpdateOperationsInput | number
    expiry_year?: IntFieldUpdateOperationsInput | number
    color_name?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credit_limit?: NullableFloatFieldUpdateOperationsInput | number | null
    provider_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    billing_date?: NullableIntFieldUpdateOperationsInput | number | null
    payment_date?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type credential_recordUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    credential_type?: StringFieldUpdateOperationsInput | string
    service_name?: StringFieldUpdateOperationsInput | string
    identifier?: NullableStringFieldUpdateOperationsInput | string | null
    secret_token?: StringFieldUpdateOperationsInput | string
    secret_hash?: StringFieldUpdateOperationsInput | string
    secret_last4?: StringFieldUpdateOperationsInput | string
    masked_secret?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type credential_recordUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    credential_type?: StringFieldUpdateOperationsInput | string
    service_name?: StringFieldUpdateOperationsInput | string
    identifier?: NullableStringFieldUpdateOperationsInput | string | null
    secret_token?: StringFieldUpdateOperationsInput | string
    secret_hash?: StringFieldUpdateOperationsInput | string
    secret_last4?: StringFieldUpdateOperationsInput | string
    masked_secret?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type credential_recordUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    credential_type?: StringFieldUpdateOperationsInput | string
    service_name?: StringFieldUpdateOperationsInput | string
    identifier?: NullableStringFieldUpdateOperationsInput | string | null
    secret_token?: StringFieldUpdateOperationsInput | string
    secret_hash?: StringFieldUpdateOperationsInput | string
    secret_last4?: StringFieldUpdateOperationsInput | string
    masked_secret?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type document_recordUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    document_type?: StringFieldUpdateOperationsInput | string
    document_number_token?: StringFieldUpdateOperationsInput | string
    document_number_last4?: StringFieldUpdateOperationsInput | string
    document_number_hash?: StringFieldUpdateOperationsInput | string
    masked_number?: StringFieldUpdateOperationsInput | string
    name_on_document?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    document_access_audit?: document_access_auditUpdateManyWithoutDocument_recordNestedInput
    document_file?: document_fileUpdateManyWithoutDocument_recordNestedInput
  }

  export type document_recordUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    document_type?: StringFieldUpdateOperationsInput | string
    document_number_token?: StringFieldUpdateOperationsInput | string
    document_number_last4?: StringFieldUpdateOperationsInput | string
    document_number_hash?: StringFieldUpdateOperationsInput | string
    masked_number?: StringFieldUpdateOperationsInput | string
    name_on_document?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    document_access_audit?: document_access_auditUncheckedUpdateManyWithoutDocument_recordNestedInput
    document_file?: document_fileUncheckedUpdateManyWithoutDocument_recordNestedInput
  }

  export type document_recordUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    document_type?: StringFieldUpdateOperationsInput | string
    document_number_token?: StringFieldUpdateOperationsInput | string
    document_number_last4?: StringFieldUpdateOperationsInput | string
    document_number_hash?: StringFieldUpdateOperationsInput | string
    masked_number?: StringFieldUpdateOperationsInput | string
    name_on_document?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type document_access_auditUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    document_record?: document_recordUpdateOneWithoutDocument_access_auditNestedInput
  }

  export type document_access_auditUncheckedUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    document_id?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type document_access_auditUncheckedUpdateManyWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    document_id?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type dashboard_favoriteUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    feature_key?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type dashboard_favoriteUncheckedUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    feature_key?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type dashboard_favoriteUncheckedUpdateManyWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    feature_key?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cardCreateManyCard_providerInput = {
    id?: bigint | number
    created_at?: Date | string
    card_name?: string | null
    number: string
    cvv: string
    holder_name?: string | null
    network: number
    isCredit?: boolean | null
    expiry_month?: number
    expiry_year?: number
    owner_id: string
    color_name?: string | null
    tags?: string
    status?: string
    credit_limit?: number | null
    billing_date?: number | null
    payment_date?: number | null
  }

  export type cardUpdateWithoutCard_providerInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    card_name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: StringFieldUpdateOperationsInput | string
    cvv?: StringFieldUpdateOperationsInput | string
    holder_name?: NullableStringFieldUpdateOperationsInput | string | null
    network?: IntFieldUpdateOperationsInput | number
    isCredit?: NullableBoolFieldUpdateOperationsInput | boolean | null
    expiry_month?: IntFieldUpdateOperationsInput | number
    expiry_year?: IntFieldUpdateOperationsInput | number
    color_name?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credit_limit?: NullableFloatFieldUpdateOperationsInput | number | null
    billing_date?: NullableIntFieldUpdateOperationsInput | number | null
    payment_date?: NullableIntFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutCardsNestedInput
  }

  export type cardUncheckedUpdateWithoutCard_providerInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    card_name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: StringFieldUpdateOperationsInput | string
    cvv?: StringFieldUpdateOperationsInput | string
    holder_name?: NullableStringFieldUpdateOperationsInput | string | null
    network?: IntFieldUpdateOperationsInput | number
    isCredit?: NullableBoolFieldUpdateOperationsInput | boolean | null
    expiry_month?: IntFieldUpdateOperationsInput | number
    expiry_year?: IntFieldUpdateOperationsInput | number
    owner_id?: StringFieldUpdateOperationsInput | string
    color_name?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credit_limit?: NullableFloatFieldUpdateOperationsInput | number | null
    billing_date?: NullableIntFieldUpdateOperationsInput | number | null
    payment_date?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type cardUncheckedUpdateManyWithoutCard_providerInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    card_name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: StringFieldUpdateOperationsInput | string
    cvv?: StringFieldUpdateOperationsInput | string
    holder_name?: NullableStringFieldUpdateOperationsInput | string | null
    network?: IntFieldUpdateOperationsInput | number
    isCredit?: NullableBoolFieldUpdateOperationsInput | boolean | null
    expiry_month?: IntFieldUpdateOperationsInput | number
    expiry_year?: IntFieldUpdateOperationsInput | number
    owner_id?: StringFieldUpdateOperationsInput | string
    color_name?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credit_limit?: NullableFloatFieldUpdateOperationsInput | number | null
    billing_date?: NullableIntFieldUpdateOperationsInput | number | null
    payment_date?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type document_access_auditCreateManyDocument_recordInput = {
    id?: bigint | number
    actor_user_id?: string | null
    action: string
    context?: string | null
    created_at?: Date | string
  }

  export type document_fileCreateManyDocument_recordInput = {
    id?: string
    file_path: string
    file_side?: string
    mime_type?: string | null
    size_bytes?: bigint | number | null
    created_at?: Date | string
  }

  export type document_access_auditUpdateWithoutDocument_recordInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutDocumentAccessAuditsNestedInput
  }

  export type document_access_auditUncheckedUpdateWithoutDocument_recordInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    actor_user_id?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type document_access_auditUncheckedUpdateManyWithoutDocument_recordInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    actor_user_id?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type document_fileUpdateWithoutDocument_recordInput = {
    id?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_side?: StringFieldUpdateOperationsInput | string
    mime_type?: NullableStringFieldUpdateOperationsInput | string | null
    size_bytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type document_fileUncheckedUpdateWithoutDocument_recordInput = {
    id?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_side?: StringFieldUpdateOperationsInput | string
    mime_type?: NullableStringFieldUpdateOperationsInput | string | null
    size_bytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type document_fileUncheckedUpdateManyWithoutDocument_recordInput = {
    id?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_side?: StringFieldUpdateOperationsInput | string
    mime_type?: NullableStringFieldUpdateOperationsInput | string | null
    size_bytes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}