import * as React from 'react';


class EmailSent extends React.Component<any, any> {



    constructor(props: any) {
        super(props);
      }

  public render() {
    
    return (
        <div className="flex-col info text-center w-2/5">
        <h3 className="text-green-400">Rezerwacja zakoczona pomyślnie!</h3>
        <h3 className="text-white">Swoje rezerwacje możesz zobaczyć w profilu użytkownika!</h3>
        </div>

    );
  }
}

export default EmailSent;
