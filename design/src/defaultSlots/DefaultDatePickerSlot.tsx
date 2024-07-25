import React, { FC, forwardRef, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import { stringUtils } from "@7pace/utilities";
import styled from "styled-components";

import { InputContainer } from "./common/components/InputContainer";
import { ButtonKind } from "../slots/button/types";
import { DatePickerDateRange, DatePickerSlotProps } from "../slots/datePicker/types";
import { IconSlotType } from "../slots/icon/types";
import { SlotSize } from "../slots/types";
import { DefaultButtonSlot } from "./DefaultButtonSlot";

import "react-datepicker/dist/react-datepicker.css";


export const DefaultDatePickerSlot: FC<DatePickerSlotProps> = ({
    errorProps,
    buttonProps,
    selected,
    onChange,
    dateRange,
    fdow,
    dateFormat,
    label,
    ...commonProps
}) => {
    const [startDate, setStartDate] = useState(selected?.from);
    const [endDate, setEndDate] = useState(selected?.to);

    const wrapperClassName = stringUtils.constructClasses(buttonProps?.className);

    const onDateChange = (dateRange: DatePickerDateRange) => {
        setStartDate(dateRange.from);
        setEndDate(dateRange.to);
        onChange?.(dateRange);
    };

    // react-datepicker doesn't support DD/MM/YYYY format yet (or ever?), which
    // is default 7pace format for short dates
    // https://github.com/Hacker0x01/react-datepicker/issues/638
    // Applying this only to default implementation
    const dateFormatCrutch = useMemo(() => dateFormat?.replace("DD", "dd").replace("YYYY", "yyyy"), [dateFormat]);

    return (
        <DatePickerInputContainer
            label={label}
            errorProps={errorProps}
        >
            <DatePicker
                {...commonProps}
                wrapperClassName={wrapperClassName}
                dateFormat={dateFormatCrutch}
                selected={startDate}
                onChange={(date) => onDateChange({
                    from: date[0] || date,
                    to: date[1]
                })}
                disabledKeyboardNavigation={commonProps.disabled}
                startDate={startDate}
                endDate={endDate}
                selectsRange={dateRange}
                placeholderText={buttonProps?.placeholder}
                calendarStartDay={fdow}
                customInput={<DatePickerButton data-testid={buttonProps?.["data-testid"]} />}
            />
        </DatePickerInputContainer>
    );
};

const DatePickerButton = forwardRef<HTMLButtonElement, unknown>(({ value, onClick, placeholder, disabled, tabIndex, ...rest }, ref) => {
    return (
        <DefaultButtonSlot
            text={value || placeholder}
            onClick={onClick}
            kind={ButtonKind.Secondary}
            size={SlotSize.Medium}
            icon={IconSlotType.Calendar}
            disabled={disabled}
            tabIndex={tabIndex}
            {...rest}
        />
    );
});

const DatePickerInputContainer = styled(InputContainer)`
   .react-datepicker-popper {
        z-index: 100;
   }
`;
