import {useFlightQuery} from './../api/ApiHooks';

const Help = () => {
  const { data: flights, isLoading, isError} = useFlightQuery();

  const handleClick = () => {
    console.log("hello");
    console.log(isLoading);
    console.log(isError);
    console.log(flights);
  }

  return (
    <div>
      <button onClick={handleClick}>
        Click me
      </button>
    </div>
  );
}

export default Help