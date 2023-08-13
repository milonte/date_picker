import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faChevronLeft, faChevronRight, faClose, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/**
 * DatePicker Header Controls
 * @param {PropsWithoutRef} props
 * @param {Date} props.defaultDate Default selected Date
 * @param {number} props.searchMonth Current targeted search month
 * @param {number} props.searchYear Current targeted search year
 * @param {Date} props.minDate Minimim Date value
 * @param {Date} props.maxDate Maximum Date value
 * @param {CallableFunction} props.handleClickClose Click Close button event
 * @param {CallableFunction} props.handleChangeMonth Change Month Event
 * @param {CallableFunction} props.handleChangeYear Change Year Event
 * @returns {ReactElement} Controls
 */
export default function Controls(props) {
    const frMonths = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    return (_jsxs("div", { className: 'header_controls', children: [_jsx("div", { className: 'left', onClick: () => props.handleChangeMonth(props.searchMonth - 1), children: _jsx(FontAwesomeIcon, { icon: faChevronLeft }) }), _jsx("div", { className: 'home', onClick: () => {
                    props.handleChangeMonth(props.defaultDate.getMonth());
                    props.handleChangeYear(props.defaultDate.getFullYear());
                }, children: _jsx(FontAwesomeIcon, { icon: faHome }) }), _jsx("select", { className: 'month_select', value: props.searchMonth, onChange: (e) => { props.handleChangeMonth(Number(e.target.value)); }, children: frMonths.map((mo, key) => {
                    return _jsx("option", { value: key, children: mo }, key);
                }) }), _jsx("select", { className: 'year_select', value: props.searchYear, onChange: (e) => { props.handleChangeYear(Number(e.target.value)); }, children: [[Array.from({ length: (props.maxDate.getFullYear() - props.minDate.getFullYear()) + 1 }, (_, i) => {
                            const value = props.minDate.getFullYear() + i;
                            return _jsx("option", { value: value, children: value }, value);
                        })]] }), _jsx("div", { className: 'right', onClick: () => props.handleChangeMonth(props.searchMonth + 1), children: _jsx(FontAwesomeIcon, { icon: faChevronRight }) }), _jsx("div", { className: 'close', onClick: () => props.handleClickClose(), children: _jsx(FontAwesomeIcon, { icon: faClose }) })] }));
}
