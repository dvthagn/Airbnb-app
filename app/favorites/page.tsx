import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../acctions/getCurrentUser";
import getFavoriteListings from "../acctions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
  const listingsFavorite = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listingsFavorite.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <FavoritesClient
        listingsFavorite={listingsFavorite}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
