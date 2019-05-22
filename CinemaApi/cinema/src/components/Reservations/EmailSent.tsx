import * as React from 'react';


class EmailSent extends React.Component<any, any> {



    constructor(props: any) {
        super(props);
      }

  public render() {
    
    return (
        <div className="info">
        <h3 className="white3">Na twój adres email został wysłany mail z potwierdzeniem</h3>
        </div>

    );
  }
}

export default EmailSent;
