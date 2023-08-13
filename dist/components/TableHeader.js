import { jsx as _jsx } from "react/jsx-runtime";
export default function TableHeader() {
    const frDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    return (_jsx("thead", { children: _jsx("tr", { children: frDays.map((day, key) => {
                return (_jsx("td", { children: day }, 'day' + key));
            }) }) }));
}
