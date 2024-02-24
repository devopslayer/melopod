import '../App.css'

function Header(props) {
  return (
    <nav className='bg-dark text-light'>
        <div className="container-fluid">
            <a className="navbar-brand logo link-light link-offset-2 link-underline link-underline-opacity-0" href="https://devopslayer/melopod">
                <img src={props.image} alt="Logo" width="30" height="30" className="d-inline-block align-text-top" />
                <h2>MeloPod</h2>
            </a>
        </div>
    </nav>
  )
}

export default Header;