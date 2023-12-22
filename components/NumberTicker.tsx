const NumberTicker = (props: any) => {

  function handleChange(value: number) {
    if (isNaN(value)) {
      props.setQuantity(0);
      return;
    }
    if (value < 1) {
      props.setQuantity(1);
      return;
    }
    props.setQuantity(value);
  }

  return (
    <div className="flex items-center gap-5">
      <button
        className="font-500 w-10 h-10 rounded-full bg-white border text-black"
        onClick={() => handleChange(props.quantity - 1)}
      >-</button>
      <input
        max={props.maxQuantity}
        className="w-full font-semibold flex-1 text-center text-gray-100 no-outline"
        style={{ background: 'transparent' }}
        min="1"
        type="number"
        onChange={(e) => handleChange(Number(e.target.value))}
        value={props.quantity}
      />
      <button
        className="font-500 w-10 h-10 rounded-full bg-white border text-black"
        onClick={() => handleChange(props.quantity + 1)}
      >+</button>
    </div>
  )
}

export default NumberTicker;
