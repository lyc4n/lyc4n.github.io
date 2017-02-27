---
layout: cheatsheet
title: React Cheatsheet
---
# React Cheatsheet

## Props VS States

___

For attributes of the component that **will not change** within the application
then use `prop`, otherwise use `state`.


## Basic Component Structure

___

**By extending from React.Component**

{% gist lyc4n/0f72c94a2b790dc03f3aa8ece56411ce basic_react_component.es6 %}


**By using React.createClass**

{% gist lyc4n/0f72c94a2b790dc03f3aa8ece56411ce react_create_class.es6 %}


## Component Lifecycle Methods

___

**Mounting**

1. `componentWillMount` - Can be used to fetch records from server via ajax
2. `render`
3. `componentDidMount` - Can be used to set timers that will fetch records

**Unmounting**

1. `componentWillUnmount` - Can be used to clear timers previously set within componentDidMount and avoid memory leaks


## References

___

[https://facebook.github.io/react](https://facebook.github.io/react)
