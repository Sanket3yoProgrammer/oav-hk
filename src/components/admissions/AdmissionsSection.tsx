import { ClipboardCheck, FileText, Calendar, CheckCircle } from 'lucide-react';
import type { AdmissionRequirement } from '../../types';

const requirements: AdmissionRequirement[] = [
  {
    id: '1',
    title: 'Age Criteria',
    description: 'Students must meet the age requirements specific to their grade level as per government guidelines.',
    documents: ['Birth Certificate', 'Age Proof Document'],
  },
  {
    id: '2',
    title: 'Academic Records',
    description: 'Previous academic records and transfer certificates from the last attended school.',
    documents: ['Previous Year Marksheets', 'Transfer Certificate', 'Character Certificate'],
  },
  {
    id: '3',
    title: 'Additional Documents',
    description: 'Supporting documents for identity and address verification.',
    documents: ['Passport Size Photos', 'Address Proof', 'Identity Documents'],
  },
];

export default function AdmissionsSection() {
  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-gray-900" id="admissions">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Admissions</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Join Our Community
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
            Begin your journey with us. We welcome students who are eager to learn and grow
            in our nurturing educational environment.
          </p>
        </div>

        <div className="mt-16 flow-root">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-50 dark:bg-gray-800" />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
                {requirements.map((requirement) => (
                  <div
                    key={requirement.id}
                    className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-700 hover:scale-105 transition-transform duration-700 shadow-xl shadow-blue-600/20"
                  >
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-x-3">
                          <ClipboardCheck className="h-6 w-6 text-blue-600" />
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {requirement.title}
                          </h3>
                        </div>
                        <p className="mt-4 text-base text-gray-600 dark:text-gray-200">
                          {requirement.description}
                        </p>
                        <div className="mt-6 border-t border-gray-100 pt-4">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">Required Documents</h4>
                          <ul className="mt-2 space-y-2">
                            {requirement.documents.map((doc) => (
                              <li key={doc} className="flex items-center text-sm text-gray-600 dark:text-gray-200">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 dark:text-green-400" />
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="rounded-2xl bg-gray-50 py-10 px-6 sm:py-16 sm:px-12 lg:flex lg:items-center lg:p-20 dark:bg-gray-800">
            <div className="lg:w-0 lg:flex-1">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Ready to Apply?
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-200">
                Download the application form or apply online. Our admissions team is here to help
                you through the process.
              </p>
            </div>
            <div className="mt-10 lg:mt-0 lg:ml-8 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-700"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Download Form
                </a>
              </div>
              <div className="mt-4 inline-flex rounded-md shadow lg:mt-0 lg:ml-4">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-blue-600 hover:bg-gray-50 dark:bg-gray-700 dark:text-white"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule Visit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}