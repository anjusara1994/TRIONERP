using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data;
using System.Reflection.Emit;
using System.Threading.Tasks;
using TrionAPI.Models;
using TrionAPI.Services;

namespace TrionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DropDownDataController : ControllerBase
    {
        private readonly DropdownDataService _dropdownService;
        

        public DropDownDataController(DropdownDataService dropdownService)
        {
            _dropdownService = dropdownService;
            
        }

        [HttpGet("Authority")]
        public async Task<IActionResult> GetAuthorities()
        {
            var OpCode = "1";
            var authorities = await _dropdownService.GetDropdownValuesAsync(OpCode);
            return Ok(authorities);
        }

        [HttpGet("SalesPersons")]
        public async Task<IActionResult> GetSalesPersons()
        {
            var OpCode = "2";
            var salesPersons = await _dropdownService.GetDropdownValuesAsync(OpCode);
            return Ok(salesPersons);
        }
        
        [HttpGet("Source")]
        public async Task<IActionResult> GetSource()
        {
            var OpCode = "3";
            var Source = await _dropdownService.GetDropdownValuesAsync(OpCode);
            return Ok(Source);
        }

        [HttpGet("Area")]
        public async Task<IActionResult> GetArea()
        {
            var OpCode = "4";
            var Area = await _dropdownService.GetDropdownValuesAsync(OpCode);
            return Ok(Area);
        }

        [HttpGet("Emirates")]
        public async Task<IActionResult> GetEmirates()
        {
            var OpCode = "5";
            var Emirates = await _dropdownService.GetDropdownValuesAsync(OpCode);
            return Ok(Emirates);
        }

        [HttpGet("Country")]
        public async Task<IActionResult> GetCountry()
        {
            var OpCode = "6";
            var Country = await _dropdownService.GetDropdownValuesAsync(OpCode);
            return Ok(Country);
        }


        [HttpGet("Client")]
        public async Task<IActionResult> GetClient(string search = "")
        {
            var OpCode = "7";
            var SearchText = search;
            var Client = await _dropdownService.GetDropdownValuesAsyncUsingPageSize(OpCode, search);
            return Ok(Client);
        }

        [HttpGet("Assignment")]
        public async Task<IActionResult> GetAssignment(string search = "")
        {
            var OpCode = "8";
            var SearchText = search;
            var Client = await _dropdownService.GetDropdownValuesAsyncUsingPageSize(OpCode, search);
            return Ok(Client);
        }



        [HttpGet("PeriodType")]
        public async Task<IActionResult> GetPeriodType()
        {
            var OpCode = "9";
            var Country = await _dropdownService.GetDropdownValuesAsync(OpCode);
            return Ok(Country);
        }

        [HttpGet("CompanyDetails")]
        public async Task<IActionResult> GetCompanyDetails()
        {
            var OpCode = "10";
            var Company = await _dropdownService.GetDefaultValues(OpCode);
            return Ok(Company);
        }

        [HttpGet("ClientDetails")]
        public async Task<IActionResult> GetClientDetails(string search = "")
        {
            var OpCode = "11";
            var SearchText = search;
            var Company = await _dropdownService.GetClientDetails(OpCode, search);
            return Ok(Company);
        }


        [HttpGet("ELDetails")]
        public async Task<IActionResult> GetELDetails(string search = "")
        {
            var OpCode = "12";
            var SearchText = search;
            var Company = await _dropdownService.GetELDetails(OpCode, search);
            return Ok(Company);
        }

        [HttpGet("AssignmentDetails")] 
        public async Task<IActionResult> GetAssignmentDetails(string search = "")
        {
            var OpCode = "13";
            var SearchText = search;
            var Company = await _dropdownService.GetELDetails(OpCode, search);
            return Ok(Company);
        }

        [HttpGet("ServiceDetails/{id}")]
        public async Task<IActionResult> GetServiceDetails(int id)
        {
            var OpCode = "8";
            int SeviceId = id;
            var Company = await _dropdownService.GetServiceDetails(OpCode, SeviceId);
            return Ok(Company);
        }



        [HttpGet("LeadDetails/{id}")]
        public async Task<IActionResult> GetLeadDetails(int id)
        {
            var OpCode = "3";
            int SeviceId = id;
            var Company = await _dropdownService.GetLeadDetails(OpCode, SeviceId);
            return Ok(Company);
        }

    }
}
