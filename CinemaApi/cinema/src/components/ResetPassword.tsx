import * as React from 'react';
import 'src/assets/css/ResetPassword.css';

class ResetPassword extends React.Component{

    public render() {

    
        return (
          
          <div className="reset-password-form">
            <div className="reset-password-description">
                Na podany poniżej adres zostanie przesłany link umożliwiający zmianę hasła!
            </div>
            <label htmlFor="reset-password-id" className="reset-password-lab">Podaj adres email:</label>
            <input id="reset-password-id" type="email" name="email" className="reset-password-input"/>
            <div className="reset-password-actions">
                <button className="reset-password-btn">Wyślij</button>
            </div>
          </div>
          
        );
      }
    }

export default ResetPassword;