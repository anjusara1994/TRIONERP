using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Xml;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace TrionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScreeningController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly IConfigurationService _configurationService;

        public ScreeningController(HttpClient httpClient,IConfigurationService configurationService)
        {
            _httpClient = httpClient;
            _configurationService = configurationService;
        }
        [HttpGet("getUNSCData")]
        public async Task<IActionResult> GetUNSCData(
            [FromQuery] string xmlnodepath = "",
            [FromQuery] string name = "",
            [FromQuery] string id = "",
            [FromQuery] string address = "",
            [FromQuery] string city = "",
            [FromQuery] string state = "",
            [FromQuery] string country = "",
            [FromQuery] string listType = "" )
        {
            if(listType == "UNSC")
            {

            
            
            var url = "https://scsanctions.un.org/resources/xml/en/consolidated.xml";
            var response = await _httpClient.GetStringAsync(url);
            
            var xdoc = new XmlDocument();
            xdoc.LoadXml(response);
           
            var nodes = xdoc.SelectNodes(xmlnodepath);
            if (nodes == null)
                return NotFound("No nodes found for the provided xmlnodepath.");

            
            var results = nodes.Cast<XmlNode>()
                .Where(node => FilterNode(node, name, id, address, city, state, country))
                .Select(node => ParseNode(node))
                .ToList();

          
            if (results.Any())
                return Ok(results);
            }
            else
            {
                string connectionString = _configurationService.GetConnectionString();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    await con.OpenAsync();

                    using (var command = new SqlCommand("GetTerroristData", con))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        // Add parameters to the stored procedure
                        command.Parameters.AddWithValue("@Name", name);
                        command.Parameters.AddWithValue("@Id", id);
                        command.Parameters.AddWithValue("@Address", address);
                        command.Parameters.AddWithValue("@City", city);
                        command.Parameters.AddWithValue("@State", state);
                        command.Parameters.AddWithValue("@Country", country);
                        command.Parameters.AddWithValue("@listType", xmlnodepath);

                        var reader = await command.ExecuteReaderAsync();
                        var results = new List<Dictionary<string, object>>();

                        while (await reader.ReadAsync())
                        {
                            // Dynamically add all columns to a dictionary
                            var row = new Dictionary<string, object>();

                            for (int i = 0; i < reader.FieldCount; i++)
                            {
                                string columnName = reader.GetName(i);
                                object columnValue = reader.IsDBNull(i) ? null : reader.GetValue(i);
                                row[columnName] = columnValue;
                            }

                            results.Add(row);
                        }

                        if (results.Any())
                        {
                            return Ok(results);
                        }
                        else
                        {
                            return NotFound("No data found for the provided filters.");
                        }
                    }
                }
            }



            return NotFound("No matching data found.");
        }
        private bool FilterNode(XmlNode node, string name, string id, string address, string city, string state, string country)
        {
            // Get values from XML nodes and normalize them
            var firstName = node.SelectSingleNode("FIRST_NAME")?.InnerText?.Trim().ToLower();
            var secondName = node.SelectSingleNode("SECOND_NAME")?.InnerText?.Trim().ToLower();
            var thirdName = node.SelectSingleNode("THIRD_NAME")?.InnerText?.Trim().ToLower();
            var fourthName = node.SelectSingleNode("FOURTH_NAME")?.InnerText?.Trim().ToLower();
            var docId = node.SelectSingleNode("INDIVIDUAL_DOCUMENT/NUMBER")?.InnerText?.Trim().ToLower();
            var streetAddress = node.SelectSingleNode("INDIVIDUAL_ADDRESS/STREET")?.InnerText?.Trim().ToLower();
            var cityAddress = node.SelectSingleNode("INDIVIDUAL_ADDRESS/CITY")?.InnerText?.Trim().ToLower();
            var stateAddress = node.SelectSingleNode("INDIVIDUAL_ADDRESS/STATE_PROVINCE")?.InnerText?.Trim().ToLower();
            var countryAddress = node.SelectSingleNode("NATIONALITY/VALUE")?.InnerText?.Trim().ToLower();

            // Normalize search parameters
            var searchName = name?.ToLower();
            var searchId = id?.ToLower();
            var searchAddress = address?.ToLower();
            var searchCity = city?.ToLower();
            var searchState = state?.ToLower();
            var searchCountry = country?.ToLower();

            bool nameMatches = string.IsNullOrEmpty(searchName) ||
                         (firstName != null && firstName.ToLower().Contains(searchName)) ||
                         (secondName != null && secondName.ToLower().Contains(searchName)) ||
                         (thirdName != null && thirdName.ToLower().Contains(searchName)) ||
                         (fourthName != null && fourthName.ToLower().Contains(searchName));

            bool idMatches = string.IsNullOrEmpty(searchId) || (docId != null && docId.ToLower().Contains(searchId));

            bool countryMatches = string.IsNullOrEmpty(searchCountry) ||
                                  (countryAddress != null && countryAddress.ToLower().Contains(searchCountry));



            // Create boolean conditions
            bool matchesFirstName =
                !string.IsNullOrEmpty(searchName) &&
                (firstName != null &&  firstName != "" && (firstName.Contains(searchName) ||
                                        secondName?.Contains(searchName) == true ||
                                        thirdName?.Contains(searchName) == true ||
                                        fourthName?.Contains(searchName) == true));

            bool matchesId =
                !string.IsNullOrEmpty(searchId) &&
                (docId != null  && docId.Contains(searchId));

            bool matchesAddress =
                !string.IsNullOrEmpty(searchAddress) &&
                (streetAddress != null  && streetAddress.Contains(searchAddress));

            bool matchesCity =
                !string.IsNullOrEmpty(searchCity) &&
                (cityAddress != null  && cityAddress.Contains(searchCity));

            bool matchesState =
                !string.IsNullOrEmpty(searchState) &&
                (stateAddress != null && stateAddress != "" && stateAddress.Contains(searchState));

            bool matchesCountry =
                !string.IsNullOrEmpty(searchCountry) &&
                (countryAddress != null && countryAddress != "" && countryAddress.Contains(searchCountry));

            // Return true if any of the conditions are met
            //return matchesFirstName || matchesId || matchesAddress || matchesCity || matchesState || matchesCountry;
            bool matches = nameMatches && idMatches && countryMatches;

            // Return true if the node matches the filter criteria
            return matches;
        }

        private object ParseNode(XmlNode node)
        {
            var firstName = node.SelectSingleNode("FIRST_NAME")?.InnerText;
            var secondName = node.SelectSingleNode("SECOND_NAME")?.InnerText;
            var thirdName = node.SelectSingleNode("THIRD_NAME")?.InnerText;
            var fourthName = node.SelectSingleNode("FOURTH_NAME")?.InnerText;
            
            var titleNodes = node.SelectNodes("TITLE/VALUE");
            var titles = titleNodes?.Cast<XmlNode>().Select(t => t.InnerText) ?? Enumerable.Empty<string>();
            var title = string.Join(", ", titles);

            var designation = string.Join(", ", node.SelectNodes("DESIGNATION/VALUE")?.Cast<XmlNode>().Select(n => n.InnerText) ?? Enumerable.Empty<string>());
            var nationality = node.SelectSingleNode("NATIONALITY/VALUE")?.InnerText;
            var listType = node.SelectSingleNode("LIST_TYPE/VALUE")?.InnerText;
            var unListType = node.SelectSingleNode("UN_LIST_TYPE")?.InnerText;
            var referenceNo = node.SelectSingleNode("REFERENCE_NUMBER")?.InnerText;
            var listedOn = node.SelectSingleNode("LISTED_ON")?.InnerText;
            var lastUpdatedDate = string.Join(", ", node.SelectNodes("LAST_DAY_UPDATED/VALUE")?.Cast<XmlNode>().Select(n => n.InnerText) ?? Enumerable.Empty<string>());
            var individualAlias = string.Join("\n", node.SelectNodes("INDIVIDUAL_ALIAS")?.Cast<XmlNode>().Select(alias =>
                $"{alias.SelectSingleNode("QUALITY")?.InnerText}: {alias.SelectSingleNode("ALIAS_NAME")?.InnerText}") ?? Enumerable.Empty<string>());
            var individualAddress = string.Join("\n", node.SelectNodes("INDIVIDUAL_ADDRESS")?.Cast<XmlNode>().Select(address =>
                $"{address.SelectSingleNode("STREET")?.InnerText}, {address.SelectSingleNode("CITY")?.InnerText}, {address.SelectSingleNode("STATE_PROVINCE")?.InnerText}, {address.SelectSingleNode("COUNTRY")?.InnerText}") ?? Enumerable.Empty<string>());

            var comments = node.SelectSingleNode("COMMENTS1")?.InnerText;

            // Extract individual date of birth details
            var dobType = node.SelectSingleNode("INDIVIDUAL_DATE_OF_BIRTH/TYPE_OF_DATE")?.InnerText;
            var dobYear = node.SelectSingleNode("INDIVIDUAL_DATE_OF_BIRTH/YEAR")?.InnerText;
            var dateOfBirth = string.IsNullOrEmpty(dobYear) ? dobType : $"{dobType} {dobYear}";

            return new
            {
                FirstName = firstName,
                SecondName = secondName,
                ThirdName = thirdName,
                FourthName = fourthName,
                Designation = designation,
                Nationality = nationality,
                ListType = listType,
                UNListType = unListType,
                ReferenceNumber = referenceNo,
                ListedOn = listedOn,
                LastUpdatedDate = lastUpdatedDate,
                IndividualAlias = individualAlias,
                IndividualAddress = individualAddress,
                Title = title,
                Comments = comments,
                DateOfBirth = dateOfBirth
            };
        }


        public class TerroristData
        {
            public int? Id { get; set; }
            public string? Name { get; set; }
            public string? Address { get; set; }
            public string? City { get; set; }
            public string? State { get; set; }
            public string? Country { get; set; }
            public string? ListType { get; set; }
            // Add other fields if necessary
        }
    }
}


