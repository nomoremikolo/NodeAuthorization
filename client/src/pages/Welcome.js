import React from 'react'

const Welcome = () => {
  return (
    <div className='container mb-5 '>
      <div>
        <img className='py-5' src="https://cdn.dressa.com.ua/ostrov-cache/top_banner/1685947893/banner-summer-1-1-11zon.webp" alt="" />
      </div>
      <div className="row">
        <div className="col-7">
          <img className='bg-transparent' src="https://cdn.dressa.com.ua/ostrov-cache/top_banner/1685948094/banner-summer-2-3-11zon.webp" alt="" />
          <p className='fw-bold text-center mt-4 text-uppercase'>Літні новинки</p>
          <button className='btn btn-outline-secondary border-black border-1 text-black fw-bold d-block mx-auto px-5 py-2'>Купити</button>
        </div>
        <div className="col-5">
          <img src="https://cdn.dressa.com.ua/ostrov-cache/top_banner/1685948191/banner-summer-3-4-11zon.webp" alt="" />
          <p className='fw-bold text-center mt-4 text-uppercase'>Прошва - хіт сезону</p>
          <button className='btn btn-outline-secondary border-black border-1 text-black fw-bold d-block mx-auto px-5 py-2'>Купити</button>
        </div>
      </div>
    </div>
  )
}

export default Welcome
