import './tools-dev.css'

export default function Calculator() {
  return (
    <div>
      <div className='calc-wrap'>
        <div className="calc-display">
          <p></p>
         <button className='calc-clear'>X</button>
          </div>
        <div className='calc-grid'>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>+</button>

          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>-</button>

          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>*</button>

          <button className="zero">0</button>
          <button>=</button>
          <button>/</button>
        </div>
      </div>
    </div>

  )
}
