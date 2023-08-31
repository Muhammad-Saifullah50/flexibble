import { Modal } from '@/components';
import { getProjectDetails } from '@/lib/actions';
import { getCurrentUser } from '@/lib/session'
import { ProjectInterface } from '@/types/commonTypes';
import Image from 'next/image';
import React from 'react'

const Project = async ({ params: { id } }: { params: { id: string } }) => {
    // this function is accepting an object whith a params property which is also an object with a property id
    // we are telling typescript that the params that the object contains a params property thich is also an object with an id property having a string value 

    const session = await getCurrentUser();
    const result = await getProjectDetails(id) as { project?: ProjectInterface }

    if (!result?.project) {
        return <p>Failed to fetched project information</p>
    }
    // console.log(result?.project)
    return (
        <section>
            <Modal>
                <div className="header flex mb-16 gap-6 w-full">
                    <div className="avatar flexCenter">
                        <Image
                            src={result?.project.createdBy.avatarUrl}
                            width={50}
                            height={50}
                            alt='avatar'
                            className='rounded-full'
                        />
                    </div>
                    <div className="text w-full">
                        <div className='top'>
                            {result?.project.title}
                        </div>
                        <div className="bottom flex flex-wrap  ">
                            <p className='mr-10'>{result?.project.createdBy.name}</p>
                            <p className='sm:ml-10'>{result?.project.category}</p>
                        </div>
                    </div>
                </div>

                <div className="image relative">
                    <Image
                        src={result?.project.image}
                        className='object-contain rounded-2xl'
                        width={800}
                        height={500}
                        alt='image'
                    />
                </div>
            </Modal>
        </section>
    )
}

export default Project