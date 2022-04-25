import Link from "next/link"
const index = () => {
    return (
      <div className="z-50 w-full lg:absolute lg:-mt-36 lg:p-6">
        <div className="center h-screen flex-wrap lg:h-64">
          <div className="hover-scale relative h-1/3 w-full overflow-hidden bg-blue-500 lg:h-full lg:w-6/12">
            <img
              className="relative h-full w-full"
              style={{ objectFit: 'cover' }}
              src="/images/tag-1.jpg"
            />
            <div className="absolute top-0 bottom-0 left-0 right-0 p-10">
              <h5 className="pb-4 text-3xl font-bold">Drinks Offer</h5>
              <p className="pb-4 text-sm">
                Buy any 2 large pizzas and
                <br /> get a 1.5L Pepsi Free{' '}
              </p>
              <button className="border border-brand_gray font-bold">
                <Link href="/explore?category=drinks">Order now</Link>
              </button>
            </div>
          </div>
          <div className="hover-scale relative h-1/3 w-full overflow-hidden bg-brand_red lg:h-full lg:w-4/12">
            <img
              className="relative h-full w-full"
              style={{ objectFit: 'cover' }}
              src="/images/tag-2.jpg"
            />
            <div className="absolute top-0 bottom-0 left-0 right-0 p-10">
              <h5 className="pb-4 text-3xl font-bold">Combo pizza</h5>
              <p className="pb-4 text-sm">
                Buy any 2 large pizzas and
                <br /> get a 1.5L Pepsi Free{' '}
              </p>
              <button className="border border-brand_gray font-bold">
                <Link href="/explore?category=snacks">Order now</Link>
              </button>
            </div>
          </div>
          <div className="hover-scale relative h-1/3 w-full overflow-hidden bg-white text-brand_gray lg:h-full lg:w-2/12">
            <img
              className="relative h-full w-full"
              style={{ objectFit: 'cover' }}
              src="/images/chef-hat.jpg"
            />
            <div className="absolute top-0 bottom-0 left-0 right-0 p-6">
              <h5 className="pb-4 text-3xl font-bold">Explore Food</h5>
              <p className="pb-4 text-sm">Order Your Favourite Food Today</p>
              <button className="border border-brand_gray font-bold">
                <Link href="/explore">Explore</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default index