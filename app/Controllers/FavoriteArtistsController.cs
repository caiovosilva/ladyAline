using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using database.models;

namespace app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteArtistsController : ControllerBase
    {
        private readonly FavoriteArtistContext _context;

        public FavoriteArtistsController(FavoriteArtistContext context)
        {
            _context = context;
        }

        // GET: api/FavoriteArtists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FavoriteArtist>>> GetFavoriteArtists()
        {
            return await _context.FavoriteArtists.ToListAsync();
        }

        // GET: api/FavoriteArtists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FavoriteArtist>> GetFavoriteArtist(int id)
        {
            var favoriteArtist = await _context.FavoriteArtists.FindAsync(id);

            if (favoriteArtist == null)
            {
                return NotFound();
            }

            return favoriteArtist;
        }

        // PUT: api/FavoriteArtists/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFavoriteArtist(int id, FavoriteArtist favoriteArtist)
        {
            if (id != favoriteArtist.id)
            {
                return BadRequest();
            }

            _context.Entry(favoriteArtist).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FavoriteArtistExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/FavoriteArtists
        [HttpPost]
        public async Task<ActionResult<FavoriteArtist>> PostFavoriteArtist(FavoriteArtist favoriteArtist)
        {
            _context.FavoriteArtists.Add(favoriteArtist);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFavoriteArtist", new { id = favoriteArtist.id }, favoriteArtist);
        }

        // DELETE: api/FavoriteArtists/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FavoriteArtist>> DeleteFavoriteArtist(int id)
        {
            var favoriteArtist = await _context.FavoriteArtists.FindAsync(id);
            if (favoriteArtist == null)
            {
                return NotFound();
            }

            _context.FavoriteArtists.Remove(favoriteArtist);
            await _context.SaveChangesAsync();

            return favoriteArtist;
        }

        private bool FavoriteArtistExists(int id)
        {
            return _context.FavoriteArtists.Any(e => e.id == id);
        }
    }
}
