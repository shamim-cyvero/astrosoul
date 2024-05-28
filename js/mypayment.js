$(document).ready(function () {
  // Single instance on page.
  var razorpay = new Razorpay({
    key: "rzp_live_sMTu5GzFkNxud8",
    // key: "V5EE9Lg1Qx8wihIGHhxDbfoj",
    // logo, displayed in the payment processing popup
    //   image: "https://i.imgur.com/n5tjHFD.png",
  });

  // Fetching the payment.
  razorpay.once("ready", function (response) {
    console.log(response.methods);
  });

  // Submitting the data.
  var data = {
    amount: 1000, // in currency subunits. Here 1000 = 1000 paise, which equals to ₹10
    currency: "INR", // Default is INR. We support more than 90 currencies.
    email: "test.me@gmail.com",
    contact: "1234567890",
    notes: {
      address: "Ground Floor, SJR Cyber, Laskar Hosur Road, Bengaluru",
    },
    order_id: '123',
    method: "netbanking",
    // method specific fields
    bank: "HDFC",
  };

  $("#razorGateway").click(function () {
    alert("Payment clicked");
    // has to be placed within a user-initiated context, such as click, in order for popup to open.
    razorpay.createPayment(data);

    razorpay.on("payment.success", function (resp) {
      alert("Payment success.");
      alert(resp.razorpay_payment_id);
      alert(resp.razorpay_order_id);
      alert(resp.razorpay_signature);
    }); // will pass payment ID, order ID, and Razorpay signature to success handler.

    razorpay.on("payment.error", function (resp) {
      alert(resp.error.description);
    }); // will pass error object to error handler
  });

  
});
