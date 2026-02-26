---
title: "React 性能优化：useMemo 与 useCallback 的正确姿势"
date: "2026-02-26"
description: "很多人把 useMemo 和 useCallback 当成万能的性能药方，却不知道滥用它们反而会让应用变慢。"
tags: ["React", "性能优化", "前端"]
---

# React 性能优化：useMemo 与 useCallback 的正确姿势

在 React 社区里，useMemo 和 useCallback 是两个被严重误解的 Hook。很多开发者的第一反应是"包一下，反正没坏处"，但现实恰恰相反——**盲目包裹只会增加内存开销和比较成本，让组件更慢**。

## 先搞清楚它们做了什么

```ts
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback(() => doSomething(a), [a]);
```

- `useMemo`：缓存**计算结果**，依赖不变时跳过重新计算
- `useCallback`：缓存**函数引用**，依赖不变时返回同一个函数对象

两者本质上都是用内存换 CPU，只有在"计算/创建成本 > 缓存比较成本"时才划算。

## 什么时候该用

### useMemo

**适合场景：** 数组过滤、排序、大量数学运算等 CPU 密集型操作。

```tsx
// ✅ 正确：列表有几百条且过滤逻辑复杂
const filteredList = useMemo(
  () => rawList.filter(item => item.active && item.score > threshold),
  [rawList, threshold]
);

// ❌ 错误：简单计算完全不需要缓存
const doubled = useMemo(() => count * 2, [count]);
```

**判断标准：** 打开 React DevTools Profiler，实际测量渲染耗时再决定。

### useCallback

**适合场景：** 将回调传给已经用 `React.memo` 包裹的子组件，或作为 `useEffect` 的依赖。

```tsx
// ✅ 正确：ChildButton 用 React.memo 包裹，需要稳定的引用
const handleClick = useCallback(() => {
  setCount(c => c + 1);
}, []); // 没有外部依赖，空依赖数组

<ChildButton onClick={handleClick} />

// ❌ 错误：原生元素不需要 useCallback
const handleChange = useCallback((e) => setValue(e.target.value), []);
<input onChange={handleChange} />
```

## 常见反模式

### 1. 在 JSX 中内联 useMemo

```tsx
// ❌ 每次渲染都会创建新的依赖数组，毫无意义
return <div>{useMemo(() => <Child />, [])}</div>;
```

### 2. 依赖数组写错

```tsx
// ❌ 遗漏 userId，导致 callback 里拿到的是过期闭包
const fetchUser = useCallback(async () => {
  const res = await api.getUser(userId); // userId 是外部变量
}, []); // 应该是 [userId]
```

用 eslint-plugin-react-hooks 可以自动检测这类错误。

### 3. 没有配合 React.memo 使用 useCallback

```tsx
// ❌ ChildButton 没有 memo 包裹，父组件一渲染子组件必然重渲，
//    useCallback 完全没起到作用
const handleClick = useCallback(() => {}, []);
<ChildButton onClick={handleClick} />  // ChildButton 是普通函数组件
```

正确做法：
```tsx
const ChildButton = React.memo(({ onClick }) => <button onClick={onClick}>Click</button>);
```

## 实战决策流程

```
有性能问题？
    ↓ 先用 Profiler 定位瓶颈
是计算耗时？→ useMemo
是子组件重渲？→ React.memo + useCallback
是状态设计问题？→ 拆分 context / 下移 state
```

**不要过早优化。** 先写出清晰的代码，等 Profiler 告诉你哪里慢了，再精准出手。

## 小结

| Hook | 缓存的是 | 搭配使用 |
|------|---------|---------|
| `useMemo` | 计算结果 | 复杂派生数据 |
| `useCallback` | 函数引用 | `React.memo` 子组件 |

记住一句话：**没有测量就没有优化**。React DevTools Profiler 是你最好的朋友。
