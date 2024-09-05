using Microsoft.Data.SqlClient;
using System.Data;
using TrionAPI.Models;
using Dapper;

namespace TrionAPI.Services
{
    public class DropdownDataService
    {
        private readonly IConfiguration _configuration;

        public DropdownDataService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private IDbConnection Connection => new SqlConnection(_configuration.GetConnectionString("erpconstr"));

        public async Task<IEnumerable<DropdownData>> GetDropdownValuesAsync(string _OpCode)
        {
            using var connection = Connection;
            var parameters = new { OpCode = _OpCode };

            return await connection.QueryAsync<DropdownData>(
                "GetDropDownData",
                parameters,
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<DropdownData>> GetDropdownValuesAsyncUsingPageSize(string _OpCode,string _Search)
        {
            using var connection = Connection;
            var parameters = new { OpCode = _OpCode , Search = _Search };

            return await connection.QueryAsync<DropdownData>(
                "GetDropDownData",
                parameters,
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<Company>> GetDefaultValues(string _OpCode)
        {
            using var connection = Connection;
            var parameters = new { OpCode = _OpCode};

            return await connection.QueryAsync<Company>(
                "GetDropDownData",
                parameters,
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<Lead>> GetClientDetails(string _OpCode, string _Search)
        {
            using var connection = Connection;
            var parameters = new { OpCode = _OpCode, Search = _Search };

            return await connection.QueryAsync<Lead>(
                "GetDropDownData",
                parameters,
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<Assignment>> GetELDetails(string _OpCode, string _Search)
        {
            using var connection = Connection;
            var parameters = new { OpCode = _OpCode, Search = _Search };

            return await connection.QueryAsync<Assignment>(
                "GetDropDownData",
                parameters,
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<Assignment>> GetAssignementDetails(string _OpCode, string _Search)
        {
            using var connection = Connection;
            var parameters = new { OpCode = _OpCode, Search = _Search };

            return await connection.QueryAsync<Assignment>(
                "GetDropDownData",
                parameters,
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<UserMenu>> GetMenuDetails(string _OpCode, int _EmpId)
        {
            using var connection = Connection;
            var parameters = new { OpCode = _OpCode, EmpId = _EmpId };

            return await connection.QueryAsync<UserMenu>(
                "GetMenuMaster",
                parameters,
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<Assignment>> GetServiceDetails(string _OpCode, int _ServiceId)
        {
            using var connection = Connection;
            var parameters = new { Opcode = _OpCode, AssignmentID = _ServiceId };

            return await connection.QueryAsync<Assignment>(
                "SP_DT_AssignmentDataMaster",
                parameters,
                commandType: CommandType.StoredProcedure
            );
        }

    }
}
