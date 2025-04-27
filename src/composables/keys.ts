import { type InjectionKey, type Ref } from "vue";

export const gameIsDrawingKey = Symbol() as InjectionKey<Readonly<Ref<boolean, boolean>>>
export const isAutopickingKey = Symbol() as InjectionKey<Readonly<Ref<boolean, boolean>>>
