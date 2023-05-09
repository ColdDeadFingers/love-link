import { PaperClipIcon } from '@heroicons/react/20/solid'

export default function Display() {
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Public Relationships</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Spot your faves?</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">@yukisslutpage & @notathott</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">5 months and 3 days</dd>
          </div>    

        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">@elonmosquito & @fanboi</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">2 years and 7 months</dd>
          </div>  

        </dl>
      </div>
    </div>
  )
}
