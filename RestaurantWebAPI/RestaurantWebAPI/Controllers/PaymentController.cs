using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;

namespace testorder.Controllers
{
    //public class paymentController : ControllerBase
    //{
        [ApiController]
        [Route("api/[controller]")]
        public class PaymentController : ControllerBase
        {
            private readonly IConfiguration _config;

            public PaymentController(IConfiguration config)
            {
                _config = config;
            }

            [HttpGet]
            [Route("initiate")]
        //[HttpPost("initiate")]
        public async Task<string> MakePayment()
        {
            var client = new HttpClient();

            var values = new Dictionary<string, string>
            {
                { "store_id", "shari642bef4c591e6" },
                { "store_passwd", "shari642bef4c591e6@ssl" },
                { "product_name", "Computer,Speaker" },
                { "product_category", "Electronic" },
                { "product_profile", "physical-goods" },
                { "total_amount", "100" },
                { "currency", "EUR" },
                { "tran_id", "REF123" },
                { "success_url", "http://127.0.0.1:5001/testpay.html" },
                { "fail_url", "http://127.0.0.1:5001/testpay.html" },
                { "cancel_url", "http://127.0.0.1:5001/testpay.html" },
                { "cus_name", "Customer Name" },
                { "cus_email", "cust@yahoo.com" },
                { "cus_add1", "Dhaka" },
                { "cus_add2", "Dhaka" },
                { "cus_city", "Dhaka" },
                { "cus_state", "Dhaka" },
                { "cus_postcode", "1000" },
                { "cus_country", "Bangladesh" },
                { "cus_phone", "01711111111" },
                { "cus_fax", "01711111111" },
                { "shipping_method", "NO" },
                { "ship_name", "Customer Name" },
                { "ship_add1", "Dhaka" },
                { "ship_add2", "Dhaka" },
                { "ship_city", "Dhaka" },
                { "ship_state", "Dhaka" },
                { "ship_postcode", "1000" },
                { "ship_country", "Bangladesh" },
                { "multi_card_name", "mastercard,visacard,amexcard" },
                { "value_a", "ref001_A" },
                { "value_b", "ref002_B" },
                { "value_c", "ref003_C" },
                { "value_d", "ref004_D" }
            };

            var content = new FormUrlEncodedContent(values);

            var response = await client.PostAsync("https://sandbox.sslcommerz.com/gwprocess/v4/api.php", content);

            var responseString = await response.Content.ReadAsStringAsync();

            return responseString;
        }
    }

    //}
}
