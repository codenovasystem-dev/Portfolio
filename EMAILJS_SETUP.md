# EmailJS Setup For `codenovasystem`

Use this file to finish the portfolio mail setup.

## 1. Create EmailJS account and service

Create:
- `Public Key`
- `Service ID`
- `Template ID` for the admin mail

Then paste them into:
- [assets/Js/custom.js](/d:/Rammiln-portfolio/assets/Js/custom.js:46)

Replace:

```js
publicKey: 'JFZbHxBdVXCGjKJyb',
serviceId: 'service_7idgz6q',
templateId: ' ',
```

## 2. Main admin email template

In EmailJS, create the main template that sends to your inbox.

Suggested settings:

- `From Name`: `codenovasystem`
- `Reply To`: `{{email}}`
- `To Email`: `codenovasystem@gmail.com`
- `Subject`: `{{title}}`

Suggested email body:

```text
New portfolio enquiry received for {{company_name}}

Name: {{name}}
Email: {{email}}
Project Type: {{projectType}}
Budget: {{budget}}

Project Details:
{{message}}

Admin inbox: {{admin_email}}
Expected reply time: {{reply_time}}
```

## 3. Auto-reply template

Create another EmailJS template for the sender auto-reply.

Suggested settings:

- `From Name`: `codenovasystem`
- `To Email`: `{{email}}`
- `Reply To`: `codenovasystem@gmail.com`
- `Subject`: `We received your message | codenovasystem`

Suggested email body:

```text
Hello {{name}},

Thanks for contacting {{company_name}}.

We received your enquiry about:
Project Type: {{projectType}}
Budget: {{budget}}

Your message:
{{message}}

Our team will get back to you {{reply_time}}.

Regards,
codenovasystem
Email: {{admin_email}}
```

## 4. Link auto-reply template

In EmailJS dashboard:

1. Open your main admin template
2. Go to the `Auto-Reply` tab
3. Link the auto-reply template
4. Save

This makes one submission do both:
- admin gets the enquiry
- sender gets confirmation mail

## 5. Variables used by the form

These fields are already present in [portfolio.html](/d:/Rammiln-portfolio/portfolio.html:396):

- `name`
- `email`
- `projectType`
- `budget`
- `message`
- `title`
- `company_name`
- `admin_email`
- `reply_time`

## 6. Test checklist

1. Add real EmailJS keys in `custom.js`
2. Submit the form from the site
3. Confirm the admin inbox receives the mail
4. Confirm the sender inbox receives the auto-reply
5. Confirm the page redirects to `thanks.html`
