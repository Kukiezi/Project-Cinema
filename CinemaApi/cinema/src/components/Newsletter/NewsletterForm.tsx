import React from 'react';
// import PropTypes from 'prop-types';
import validator from 'validator';
import handleSendEmail from './Newsletter';
import handleOnChangeEmail from './Newsletter';

import { Form, Input, Button, Icon } from 'antd';

const NewsletterForm = ({email= '' }) => {
  return (
    <Form layout='inline' className="newsletter-form" method="POST">
      <Form.Item>
        <Input prefix={<Icon type="red-envelope" />} placeholder="Email" value={email}
          onChange={({target}) => new handleOnChangeEmail(target.value)} />
      </Form.Item>
      <Form.Item>
        <Button onClick={() => new handleSendEmail(email)} disabled={!validator.isEmail(email)}
          type="primary" htmlType="submit">
          Send
        </Button>
      </Form.Item>
    </Form>
  )
}

// NewsletterForm.propTypes = {
//   email: PropTypes.string.isRequired,
//   handleSendEmail: PropTypes.func.isRequired,
//   handleOnChangeEmail: PropTypes.func.isRequired
// }

export default NewsletterForm;