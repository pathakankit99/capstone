import Link from 'next/link'
const index = () => {
    return (
      <div className="center relative h-90vh">
        <img
          className="fixed top-0 bottom-0 -z-10"
          style={{ height: '100vh', objectFit: 'cover' }}
          src="/images/offer.jpg"
        />
        <div>
          <h4 className="text-center font-extrabold uppercase md:text-3xl lg:text-5xl">
            Big sale
          </h4>
          <h4 className="text-center font-extrabold uppercase md:text-3xl lg:text-5xl">
            With special price
          </h4>
          <div className="center pt-6">
            <button>
              <Link href="/explore">Order now</Link>
            </button>
          </div>
        </div>
      </div>
    )
}

export default index;