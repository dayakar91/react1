function Car(props){
    
    const shoot=()=>{
        alert("Im car onclick event")
    }
    return (
        [
    <h2>I am a { props.brand.name } model {props.brand.model} Car!</h2>,
    <button onClick={shoot}>Click!</button>,
    <ul>
        {props.cars.map( (i)=> {
        return <li>{i}</li>;
      })}
    </ul>
        ]
    );
}
export default Car;