import { API_URL } from "./constants";

/**
 * Helper function to add the
 * @param {Object} options - HTTP header options
 * @returns {Object} - HTTP header options with Authorization header
 */

function updateOptions(options) {
  const update = { ...options };
  if (localStorage.getItem("token")) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }
  return update;
}

/**
 * Wrapper around fetch to add Authorization header
 * @returns {Promise} - fetch promise
 */
export default function fetcher(url, options) {
  return fetch(url, updateOptions(options));
}

/**
 * Fetch all posts with comments, reactions and the author
 * @returns {Object | Error} - A list of posts
 */

export async function registerUser({ email, password, username, avatar }) {
  const url = new URL(`${API_URL}/auth/register`);

  const userData = {
    name: username,
    email,
    password,
    avatar,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) return response.json();
  } catch (error) {
    throw new Error(error);
  }
}

/** *Login user - login page*/
export async function loginUser({ email, password }) {
  const url = new URL(`${API_URL}/auth/login`);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ email, password }),
  };
  try {
    const response = await fetch(url, options);

    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user_name", data.name);
    localStorage.setItem("user_email", data.email);
    localStorage.setItem("credits", data.credits);
    localStorage.setItem("avatar", data.avatar);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

/** AUCTION ITEMS **/
export async function fetchAllListings(
  tag = "",
  offset = 0,
  order = "new",
  status = "all"
) {
  const url = new URL(`${API_URL}/listings`);
  url.searchParams.append("limit", 12);
  url.searchParams.append("offset", offset * 12); // Offset the same elements as shown.
  order == "new"
    ? url.searchParams.append("sort", "created")
    : url.searchParams.append("sortOrder", order);

  if (tag) url.searchParams.append("_tag", tag);

  if (!localStorage.getItem("token"))
    url.searchParams.append("_active", "true");
  else {
    if (status == "active") url.searchParams.append("_active", "true");
  }

  try {
    const response = await fetcher(url.href);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
}
/** Create new Listing */

export async function postNewListing(newLisitng) {
  const url = new URL(`${API_URL}/listings`);

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newLisitng),
  };

  options = updateOptions(options);

  try {
    const response = await fetch(url, options);
    if (response.ok) return response.json();
  } catch (error) {
    throw new Error(error);
  }
}

/** LISTING SPECIFIC */

export async function fetchListingById(listingId) {
  const url = new URL(`${API_URL}/listings/${encodeURIComponent(listingId)}`);
  url.searchParams.append("_bids", "true");
  url.searchParams.append("_seller", "true");

  try {
    const response = await fetch(url.href);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteListingById(listingId) {
  const url = new URL(`${API_URL}/listings/${encodeURIComponent(listingId)}`);
  url.searchParams.append("_bids", "true");
  url.searchParams.append("_seller", "true");

  const deleteOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const options = updateOptions(deleteOptions);

  try {
    const response = await fetch(url.href, options);
    if (!response.ok) throw new Error(response.statusText);
    return;
  } catch (error) {
    throw new Error(error);
  }
}

export async function postListingBid(listingId, amount) {
  const url = new URL(
    `${API_URL}/listings/${encodeURIComponent(listingId)}/bids`
  );

  const getOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: parseFloat(amount) }),
  };
  const options = updateOptions(getOptions);

  try {
    const response = await fetch(url.href, options);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

// Get profile information
export async function fetchProfileByName(profileName) {
  const url = new URL(`${API_URL}/profiles/${encodeURIComponent(profileName)}`);
  url.searchParams.append("_listings", "true");
  url.searchParams.append("_wins", "true");

  const getOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const options = updateOptions(getOptions);

  try {
    const response = await fetch(url.href, options);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
// Get profile bidding information
export async function fetchBidsByName(profileName) {
  const url = new URL(
    `${API_URL}/profiles/${encodeURIComponent(profileName)}/bids`
  );
  url.searchParams.append("_listings", "true");

  const getOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const options = updateOptions(getOptions);

  try {
    const response = await fetch(url.href, options);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function putUpdateEntryMedia(profileName, imageUrl) {
  const url = new URL(
    `${API_URL}/profiles/${encodeURIComponent(profileName)}/media`
  );
  const getOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ avatar: imageUrl }),
  };
  const options = updateOptions(getOptions);

  try {
    const response = await fetch(url.href, options);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
