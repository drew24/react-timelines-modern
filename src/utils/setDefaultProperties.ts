 type DefaultPropertyKeys<O extends object> = {
  [K in keyof O]-?: {} extends Pick<O, K> ? K : never
}[keyof O]

/**
 * Utility class for creating a "default values" type to use with a React
 * component.
 * 
 * The DefaultProperties interface will include only *non-required* values
 * from component Props.
 * 
 */
 export type DefaultProperties<ComponentProperties extends object> = Required<Pick<ComponentProperties, DefaultPropertyKeys<ComponentProperties>>>;

 /**
  * Combine passed props with a default set of props, and ensure that all properties have been set.
  * @param props 
  * @param defaultProps 
  * @returns 
  */
export default function setDefaultProperties<Props extends object>(props: Props, defaultProps: DefaultProperties<Props>): Required<Props> {
  return Object.assign({}, defaultProps, props) as Required<Props>;
}
