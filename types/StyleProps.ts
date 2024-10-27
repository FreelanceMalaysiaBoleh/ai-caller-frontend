type GridRange<N extends number, Result extends unknown[] = []> =
    Result['length'] extends N ? Result[number] : GridRange<N, [...Result, Result['length']]>


export interface StyleProps {
    borderRadius?: number,
    backgroundColor?: string,
    width?: string,
    grid?: GridRange<13>,
    padding?: number,
    paddingTop?: number,
    paddingBottom?: number,
    paddingRight?: number,
    paddingLeft?: number
    marginTop?: number,
    marginBottom?: number,
    marginRight?: number,
    marginLeft?: number
}

export const defaultStyleValues = {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 0,
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    paddingLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
}
