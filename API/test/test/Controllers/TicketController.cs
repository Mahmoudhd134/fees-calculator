using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using test.Data;
using test.Models;

namespace test.Controllers;

public class TicketController : Controller
{
    private readonly AppDbContext _context;

    public TicketController(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ActionResult> Index(int? id = null)
    {
        var ticket = await _context.Tickets
            .Include(x => x.Domain)
            .FirstOrDefaultAsync(x => id == null || x.Id == id);

        ticket ??= new Ticket();

        await SetPrevAndNext(ticket?.Id ?? 0);
        await SetDomains(ticket?.Domain?.Name);

        return View(ticket);
    }

    public async Task<IActionResult> Delete(int id)
    {
        var ticket = new Ticket()
        {
            Id = id
        };
        _context.Remove(ticket);
        await _context.SaveChangesAsync();
        var prevId = await _context.Tickets
            .Where(x => x.Id < id)
            .Select(x => x.Id)
            .OrderByDescending(x => x)
            .FirstOrDefaultAsync();

        return RedirectToAction("Index", new { id = prevId != 0 ? prevId : (int?)null });
    }

    public async Task<IActionResult> Edit(Ticket ticket)
    {
        if (ModelState.IsValid == false)
        {
            await SetPrevAndNext(ticket.Id);
            await SetDomains();
            return View("index", ticket);
        }

        if (ticket.Id == 0)
            return RedirectToAction("Index");
        _context.Update(ticket);
        await _context.SaveChangesAsync();
        return RedirectToAction("Index", new { id = ticket.Id });
    }

    public async Task<IActionResult> Add(Ticket ticket)
    {
        if (ModelState.IsValid == false)
        {
            await SetPrevAndNext(0);
            await SetDomains();
            return View("index", ticket);
        }

        ticket.Id = 0;
        _context.Add(ticket);
        await _context.SaveChangesAsync();
        return RedirectToAction("Index", new { id = ticket.Id });
    }

    private async Task SetPrevAndNext(int id)
    {
        if (id == 0)
        {
            ViewBag.Prev = ViewBag.Next = 0;
            return;
        }

        var prevId = await _context.Tickets
            .Where(x => x.Id < id)
            .Select(x => x.Id)
            .OrderByDescending(x => x)
            .FirstOrDefaultAsync();
        if (prevId == 0)
            prevId = id;

        var nextId = await _context.Tickets
            .Where(x => x.Id > id)
            .Select(x => x.Id)
            .FirstOrDefaultAsync();
        if (nextId == 0)
            nextId = id;

        ViewBag.Prev = prevId;
        ViewBag.Next = nextId;
    }

    private async Task SetDomains(string defaultName = null)
    {
        var domains = await _context.Domains.ToListAsync();
        var selectList = new SelectList(domains, "Id", "Name", defaultName);
        ViewBag.Domains = selectList;
    }
}