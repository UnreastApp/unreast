import { Member, Office, Profile } from "@prisma/client"

export type OfficeWithMembersWithProfiles = Office & {
    member: (Member & { profile: Profile })[];
};