import CheckboxContext from './CheckBoxContext';

function CheckboxGroup({
    children,
    disabled: groupDisabled,
    values,
    onChange
}) {
    const isDisabled = (disabled) => disabled || groupDisabled;

    // const isChecked = (value) => values.includes(value);
    const isChecked = (value) => {
        for(let i = 0; i < values.length; i++){
            values[i].includes(value[1]);
        }
    };



    const toggleValue = ({ checked, value }) => {
        if (checked) {
            onChange(values.concat(value));
        } else {
            onChange(values.filter((v) => v !== value));
        }
    };

    return (
        <div>
            <CheckboxContext.Provider value={{ isDisabled, isChecked, toggleValue }}>
                {children}
            </CheckboxContext.Provider>
        </div>
    );
}

export default CheckboxGroup;