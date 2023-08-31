import { Modal } from '@/components';
import { getProjectDetails } from '@/lib/actions';
import { getCurrentUser } from '@/lib/session'
import { ProjectInterface } from '@/types/commonTypes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Project = async ({ params: { id } }: { params: { id: string } }) => {
    // this function is accepting an object whith a params property which is also an object with a property id
    // we are telling typescript that the params that the object contains a params property thich is also an object with an id property having a string value 

    const session = await getCurrentUser();
    const result = await getProjectDetails(id) as { project?: ProjectInterface }

    if (!result?.project) {
        return <p>Failed to fetched project information</p>
    }
    const renderLink = () => `/profile/${result?.project?.createdBy.id}`
    // console.log(result?.project)
    return (
        <section>
            <Modal>
                <div className="header flex mb-16 gap-6 w-full">
                    <div className="avatar flexCenter">
                        <Link href={renderLink()}>
                        <Image
                            src={result?.project.createdBy.avatarUrl}
                            width={60}
                            height={60}
                            alt='avatar'
                            className='rounded-full'
                        />
                        </Link>
                    </div>
                    <div className="text w-full">
                        <div className='top font-semibold'>
                            {result?.project.title}
                        </div>
                        <div className="bottom flex flex-wrap  ">
                            <p className='mr-10'>{result?.project.createdBy.name}</p>
                            <p className='sm:ml-10 text-primary-purple'>{result?.project.category}</p>
                        </div>
                    </div>
                </div>

                <div className="image">
                    <Image
                        src={result?.project.image}
                        className='object-contain rounded-2xl'
                        width={800}
                        height={500}
                        alt='image'
                    />
                </div>

                <div className="desc py-10 text-lg text-center">
                    {result?.project.description}
                </div>
                <div className="links flex justify-around flex-wrap mt-12">
                    <Link
                        href={result?.project.githubUrl}
                        target='_blank' 
                        className='text-primary-purple flex pb-2 px-3'>
                        <Image
                            src='/github-mark.svg'
                            height={10}
                            width={20}
                            alt='github'
                            className='pr-1' />
                        <p>View on Github</p>
                    </Link>
                    <Link
                    target='_blank'
                        href={result?.project.liveSiteUrl} className='text-primary-purple flex  px-3'>
                        &#128640; View live Demo
                    </Link>
                </div>

                <div className='flexCenter w-full gap-8 mt-28'>
                    <span className='w-full h-0.5 bg-light-white-200' />
                    <Link href={renderLink()} >
                    <Image
                        src={result?.project.createdBy.avatarUrl}
                        width={80}
                        height={80}
                        alt='profile'
                        className='rounded-full'
                    />
                    </Link>
                    <span className='w-full h-0.5 bg-light-white-200' />
                </div>

            </Modal>
        </section>
    )
}

export default Project