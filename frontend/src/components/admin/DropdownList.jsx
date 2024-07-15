
export const DropdownList = ({selectedValue, setSelectedValue, options}) => {

  return (
    <select 
        value={selectedValue} 
        onChange={(e) => setSelectedValue(e.target.value)} 
        > 
        {options.map((option) => ( 
        <option key={option.value} value={option.value}> 
        {option.label}
        </option> 
        ))}
    </select> 
  )
}
