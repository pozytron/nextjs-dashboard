import Image from 'next/image';
import {fetchFilteredMonsters} from "@/app/lib/data/monsters";
import {formatDateToLocal} from "@/app/lib/utils";
import {UpdateMonster} from "@/app/ui/monsters/buttons";

type Props = {
  query: string;
  currentPage: number;
}
export default async function CustomersTable({query, currentPage,}: Props) {
  const monsters = await fetchFilteredMonsters(query, currentPage)
  return (

      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {monsters?.map((monster) => (
                  <div
                    key={monster.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <img
                                src={monster.image ?? ''}
                                alt={`${monster.name}'s profile picture`}
                            />
                            <p>{monster.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {monster.power}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Active</p>
                        <p className="font-medium">{monster.is_active?"yes":"no"}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Created At</p>
                        <p className="font-medium">{monster.created_at&&formatDateToLocal(monster.created_at)}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>Updated at {monster.updated_at && formatDateToLocal(monster.updated_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Is active
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Team
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Created date
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    Updated date
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white">
                {monsters.map((monster) => (
                    <tr key={monster.id}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >

                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                          <Image
                              src={monster.image}
                              className="rounded-full"
                              alt={`${monster.name}'s picture`}
                              width={28}
                              height={28}
                          />
                          <p>{monster.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {monster.is_active ? "Active" : "Not active"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {monster.team ? monster.team : "-"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {monster.created_at && formatDateToLocal(monster.created_at)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {monster.updated_at && formatDateToLocal(monster.updated_at)}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateMonster id={monster.id}/>
                        </div>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

  );
}
