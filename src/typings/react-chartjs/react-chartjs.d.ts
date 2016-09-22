// Type definitions for react-chartjs v0.7.3
// Project: https://github.com/jhudson8/react-chartjs
// Definitions by: Bartlomiej Tomala <http://github.com/btomala>
// Definitions: https://github.com/MeStudent/react-chartjs-typings

declare namespace ReactChartjs {

    import React = __React

    /* components */

    interface Dataset {
        label: string
        fillColor: string
        strokeColor: string,
        highlightFill: string
        highlightStroke: string
        data: Array<number>
    }

    interface BarData {
        labels: Array<string>
        datasets: Array<Dataset>
    }

    interface BarProps extends React.Props<Bar> {
        data: BarData
        options?: any
        redraw?: boolean
        width?: string
        height?: string
    }
    interface Bar extends React.ComponentClass<BarProps> {}
    interface BarElement extends React.ReactElement<BarProps> {}
    const Bar: Bar
    const BarData: BarData

}

declare module "react-chartjs/lib/bar" {

    export default ReactChartjs.Bar
    export import BarData = ReactChartjs.BarData;

}

declare module "react-chartjs" {

    import Bar from "react-chartjs/lib/bar"
    import { BarData } from "react-chartjs/lib/bar"

    export { Bar, BarData }

}