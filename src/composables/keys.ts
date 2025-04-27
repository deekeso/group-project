import { type InjectionKey, type Ref } from "vue";

export const gameIsDrawingKey = Symbol() as InjectionKey<Readonly<Ref<boolean, boolean>>>
