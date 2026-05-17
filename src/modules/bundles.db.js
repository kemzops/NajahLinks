import db from "../database/client.js";

/**
 * Get all bundles for a user
 */
export async function getBundlesByUserId(userId) {
  const result = await db.execute(
    `
      SELECT *
      FROM bundles
      WHERE user_id = ?
      ORDER BY created_at DESC
    `,
    [userId],
  );

  return result.rows || [];
}

/**
 * Find bundle by slug
 */
export async function findBundleBySlug(slug) {
  const result = await db.execute(
    "SELECT * FROM bundles WHERE slug = ? LIMIT 1",
    [slug],
  );

  return result.rows[0] || null;
}

/**
 * Create bundle (must pass user_id from JWT)
 */
export async function createBundle({
  user_id,
  title,
  description = null,
  slug,
}) {
  const result = await db.execute(
    `
      INSERT INTO bundles (user_id, title, description, slug)
      VALUES (?, ?, ?, ?)
    `,
    [user_id, title, description, slug],
  );

  return result.lastInsertRowid;
}

/**
 * Get all links by BundleID
 */
export async function getLinksByBundleId(bundleId) {
  const result = await db.execute(
    `
      SELECT *
      FROM links
      WHERE bundle_id = ?
      ORDER BY created_at ASC
    `,
    [bundleId],
  );

  return result.rows || [];
}

/**
 * Update bundle details
 */
export async function updateBundle({ id, title, description = null }) {
  const result = await db.execute(
    `
      UPDATE bundles
      SET title = ?,
          description = ?
      WHERE id = ?
    `,
    [title, description, id],
  );

  return result.rowsAffected > 0;
}

/**
 * Create/Add(?) link inside a bundle
 */
export async function addLink({ bundle_id, title = null, url }) {
  const result = await db.execute(
    `
      INSERT INTO links (bundle_id, title, url)
      VALUES (?, ?, ?)
    `,
    [bundle_id, title, url],
  );

  return result.lastInsertRowid;
}

/**
 * Delete Bundle using ID
 */
export async function deleteBundle(id) {
  const result = await db.execute(
    `
      DELETE FROM bundles
      WHERE id = ?
    `,
    [id],
  );

  return result.rowsAffected > 0;
}

/**
 * Small Delete Link By ID ;d
 */
export async function deleteLink(id) {
  const result = await db.execute(`DELETE FROM links WHERE id = ?`, [id]);

  return result.rowsAffected > 0;
}

/**
 * Small Get Link By ID ;d
 */
export async function findLinkById(id) {
  const result = await db.execute("SELECT * FROM links WHERE id = ? LIMIT 1", [
    id,
  ]);

  return result.rows[0] || null;
}

/**
 * Update Link using link id
 */
export async function updateLink({ id, title = null, url }) {
  const result = await db.execute(
    `
      UPDATE links
      SET title = ?,
          url = ?
      WHERE id = ?
    `,
    [title, url, id],
  );

  return result.rowsAffected > 0;
}

/**
 * BAD FOR TURSO CLOUD BUT SURE :)
 * @param {*} id
 */
export async function incrementBundleViews(id) {
  await db.execute(
    `
      UPDATE bundles
      SET views = views + 1
      WHERE id = ?
    `,
    [id],
  );
}
