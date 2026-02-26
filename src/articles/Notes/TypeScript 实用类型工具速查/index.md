---
title: "TypeScript 实用类型工具速查"
date: "2026-02-26"
description: "Partial、Pick、Omit、Record……这些内置工具类型到底该怎么用？一篇文章整理清楚。"
tags: ["TypeScript", "笔记", "前端"]
---

# TypeScript 实用类型工具速查

这篇笔记整理了日常开发中最常用的 TypeScript 内置工具类型，附带使用场景和示例，方便随时查阅。

---

## 修改属性的可选性

### `Partial<T>`

将所有属性变为可选。

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

// 更新用户时，只传需要修改的字段
function updateUser(id: number, patch: Partial<User>) { ... }

updateUser(1, { name: "Wallace" }); // ✅
```

### `Required<T>`

将所有属性变为必填（与 Partial 相反）。

```ts
interface Config {
  host?: string;
  port?: number;
}

// 确保配置完整后再使用
function startServer(config: Required<Config>) { ... }
```

### `Readonly<T>`

将所有属性变为只读，防止意外修改。

```ts
const config: Readonly<Config> = { host: "localhost", port: 3000 };
config.port = 8080; // ❌ 编译报错
```

---

## 选取与排除属性

### `Pick<T, K>`

从类型中选取指定属性。

```ts
type UserPreview = Pick<User, "id" | "name">;
// 等价于 { id: number; name: string }
```

**适合场景：** API 响应只返回部分字段时定义类型。

### `Omit<T, K>`

从类型中排除指定属性。

```ts
type UserWithoutEmail = Omit<User, "email">;
// 等价于 { id: number; name: string }
```

**适合场景：** 表单类型去掉 `id`（提交时由后端生成）。

---

## 联合类型操作

### `Exclude<T, U>`

从联合类型 T 中排除可以赋值给 U 的类型。

```ts
type Status = "pending" | "active" | "deleted";
type ActiveStatus = Exclude<Status, "deleted">; // "pending" | "active"
```

### `Extract<T, U>`

从联合类型 T 中提取可以赋值给 U 的类型。

```ts
type OnlyString = Extract<string | number | boolean, string>; // string
```

---

## 构造映射类型

### `Record<K, V>`

创建键为 K、值为 V 的对象类型。

```ts
// 状态码到描述的映射
const statusMap: Record<number, string> = {
  200: "OK",
  404: "Not Found",
  500: "Internal Server Error",
};

// 以联合类型为键
type PageMap = Record<"home" | "about" | "blog", string>;
```

**Record vs 索引签名：**

```ts
// 索引签名：键的类型宽泛
interface Dict { [key: string]: string }

// Record：键可以是具体的联合类型，更严格
type Dict = Record<"a" | "b", string>;
```

---

## 函数类型工具

### `ReturnType<T>`

获取函数的返回类型。

```ts
function getUser() {
  return { id: 1, name: "Wallace" };
}

type User = ReturnType<typeof getUser>;
// { id: number; name: string }
```

### `Parameters<T>`

获取函数参数的元组类型。

```ts
function createUser(name: string, age: number) { ... }

type Params = Parameters<typeof createUser>; // [string, number]
```

**实用技巧：** 当函数来自第三方库且没有导出参数类型时，用 Parameters 提取。

---

## 条件类型

### `NonNullable<T>`

从类型中排除 `null` 和 `undefined`。

```ts
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>; // string
```

---

## 组合使用示例

```ts
interface ApiResponse<T> {
  data: T;
  error: string | null;
  loading: boolean;
}

type User = { id: number; name: string; password: string };

// 接口响应：不返回密码，且可能是加载中（data 为 null）
type UserResponse = ApiResponse<Omit<User, "password"> | null>;
```

---

## 速查表

| 工具类型 | 作用 |
|---------|------|
| `Partial<T>` | 所有属性变可选 |
| `Required<T>` | 所有属性变必填 |
| `Readonly<T>` | 所有属性变只读 |
| `Pick<T, K>` | 选取指定属性 |
| `Omit<T, K>` | 排除指定属性 |
| `Record<K, V>` | 构造键值映射类型 |
| `Exclude<T, U>` | 联合类型中排除 |
| `Extract<T, U>` | 联合类型中提取 |
| `ReturnType<T>` | 函数返回类型 |
| `Parameters<T>` | 函数参数类型 |
| `NonNullable<T>` | 排除 null/undefined |
