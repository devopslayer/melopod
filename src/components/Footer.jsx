import '../App.css'

function Footer(props) {
    return (
      <footer className='bg-dark text-light'>
        <b>
          Copyright &copy; {props.year}. All rights reserved <a href="https://devopslayer/melopod" className='link-info link-offset-2 link-underline link-underline-opacity-0 mx-2'>@Devopslayer</a>
        </b>
      </footer>
    )
  }
  
  export default Footer;