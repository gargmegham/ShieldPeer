// nivo
import { Margin, Theme } from "@nivo/core"
import { LineSvgProps, ResponsiveLine } from "@nivo/line"

const generateYAxisTickValues = (data: number[]) => {
    if (!data || !Array.isArray(data) || data.length === 0) return []

    const minValue = 0
    const maxValue = Math.max(...data)

    const valueRange = maxValue - minValue

    let tickInterval = 1

    if (valueRange < 10) tickInterval = 1
    else if (valueRange < 20) tickInterval = 2
    else if (valueRange < 50) tickInterval = 5
    else tickInterval = (Math.ceil(valueRange / 100) * 100) / 10

    const tickValues: number[] = []
    let tickValue = minValue
    while (tickValue <= maxValue) {
        tickValues.push(tickValue)
        tickValue += tickInterval
    }

    return tickValues
}
const CHARTS_THEME: Theme = {
    background: "transparent",
    axis: {
        domain: {
            line: {
                stroke: "rgb(var(--color-background-80))",
                strokeWidth: 0.5,
            },
        },
    },
    tooltip: {
        container: {
            background: "rgb(var(--color-background-80))",
            color: "rgb(var(--color-text-200))",
            fontSize: "0.8rem",
            border: "1px solid rgb(var(--color-border-300))",
        },
    },
    grid: {
        line: {
            stroke: "rgb(var(--color-border-100))",
        },
    },
}
const DEFAULT_MARGIN = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
}
type TGraph = {
    height?: string
    width?: string
    margin?: Partial<Margin>
    theme?: Theme
}
type Props = {
    customYAxisTickValues?: number[]
}
const LineGraph: React.FC<Props & TGraph & LineSvgProps> = ({
    customYAxisTickValues,
    height = "400px",
    width = "100%",
    margin,
    theme,
    ...rest
}) => (
    <div style={{ height, width }}>
        <ResponsiveLine
            margin={{ ...DEFAULT_MARGIN, ...(margin ?? {}) }}
            axisLeft={{
                tickSize: 0,
                tickPadding: 10,
                tickValues: customYAxisTickValues ? generateYAxisTickValues(customYAxisTickValues) : undefined,
            }}
            theme={{ ...CHARTS_THEME, ...(theme ?? {}) }}
            animate
            {...rest}
        />
    </div>
)
export default LineGraph
