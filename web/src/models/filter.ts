export type FilterOption<TValue extends string = string> = {
  value: TValue;
  label: string;
};

export type FilterOptions<TValue extends string = string> = ReadonlyArray<
  FilterOption<TValue>
>;
