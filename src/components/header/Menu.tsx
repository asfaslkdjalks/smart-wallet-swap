import Navbar from './Navbar';
import NavbarMobile from './NavbarMobile';
import BuildHeader from './BuildHeader';

function Menu() {
  return (
    <>
      <BuildHeader className="h-[0.5px] w-full bg-gray-700 md:hidden" />
      {/* <div className="z-10 mt-4 h-[72px] md:hidden">
        <NavbarMobile />
      </div> */}
      <div className="container z-10">
        <div className="flex flex-col gap-6 pt-6 md:pt-0 md:pb-4">
          <Navbar />
        </div>
      </div>
      <BuildHeader className="w-full p-6 text-left md:text-center hidden w-full md:mt-4 md:block" />
    </>
  );
}

export default Menu;
