import logo from '../assets/logo.png'


function Header() {

    return (
        <div>
            <div className="flex justify-center mx-auto p-4">
                <img src={logo} alt="Investment Calculator"></img>
            </div>
            <p className="text-white text-5xl p-4 ">Investment Calculator</p>
        </div>
    )
}

export default Header;



