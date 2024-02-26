using CMS.Api.PropertySystem.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Api.PropertySystem.Services
{
    public interface ILockerService
    {
        Task<ActionResult<Locker>> CreateLocker(Locker locker);
        Task<ActionResult<Locker>> UpdateLocker(Locker updatedLocker);
    }
}
