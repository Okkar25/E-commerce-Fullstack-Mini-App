import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// enum ResourceType {
//   BOOK,
//   AUTHOR,
//   FILM,
//   DIRECTOR,
// }

// interface Resource<T> {
//   uid: number;
//   resourceType: ResourceType;
//   data: T;
// }

// const docOne: Resource<Object> = {
//   uid: 1,
//   resourceType: ResourceType.BOOK,
//   data: { title: "The Shining" },
// };

// const docTwo: Resource<Object> = {
//   uid: 2,
//   resourceType: ResourceType.DIRECTOR,
//   data: { title: "Miko" },
// };

// console.log(docOne, docTwo);
// docOne => 0
// odcTwo => 3

// enum OrderStatus {
//   ORDERED,
//   OUTFORDELIVERY,
//   DELIVERED,
//   CANCELLED,
// }
// const createOrder = (param: OrderStatus) => {
//   //   const status = OrderStatus.DELIVERED;
//   //   console.log(status)
//   console.log(param);
// };
// createOrder(OrderStatus.OUTFORDELIVERY);
